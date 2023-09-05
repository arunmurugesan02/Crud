const add = document.querySelector(".add");
const form = document.querySelector(".form-wrapper");
const submit = document.querySelector(".submit");
const cancel = document.querySelector(".cancel");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const dob = document.querySelector("#dob");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");

let ena_method = null;
let data = {};
let name = null;
let id = null;
let summa = [];
let fnamecheck = null,
  lnamecheck = null,
  dobcheck = null,
  emailcheck = null,
  phonecheck = null;

function fNameValidation(element) {
  namey = /^[A-Za-z]+$/;
  if (!namey.test(firstName.value.trim())) {
    fnamecheck = false;
    Error(element, "Invalid name");
  } else {
    fnamecheck = true;
    Success(element);
  }
}
function lNameValidation(element) {
  namex = /^[A-Za-z]+$/;
  if (!namex.test(lastName.value.trim())) {
    lnamecheck = false;
    Error(element, "Invalid name");
  } else {
    lnamecheck = true;
    Success(element);
  }
}

function DobValidation(element) {
  const futureDate = new Date();
  const selectedDate = new Date(element.value);
  if (selectedDate > futureDate) {
    dobcheck = false;
    Error(element, "Future Date is not allowed");
  } else {
    dobcheck = true;
    Success(element);
  }
}

async function EmailValidation(element) {
  emailcheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  console.log(email.value);

  if (!emailcheck.test(email.value.trim())) {
    emailcheck = false;
    Error(element, "Enter a valid email");
  } else {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    try {
      const response = await fetch(
        `http://localhost:8000/user/checkEmail?email=${encodeURIComponent(
          email.value
        )}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (data.exists) {
        emailcheck = false;
        Error(element, "Email already exists");
      } else {
        emailcheck = true;
        Success(element);
      }
    } catch (error) {
      console.error(error);
      errorDisplay.innerText = "An error occurred";
    }
  }
}

function PhoneValidation(element) {
  phonecheck = /^[0-9]{10}$/;
  if (!phonecheck.test(phone.value.trim())) {
    phonecheck = false;
    Error(element, "Enter 10 digits only");
  } else {
    phonecheck = true;
    Success(element);
  }
}

function Error(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
}

function Success(element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.remove("error");
}
function clearValidation() {
  fnamecheck = null;
  lnamecheck = null;
  dobcheck = null;
  emailcheck = null;
  phonecheck = null;

  Success(firstName);
  Success(lastName);
  Success(dob);
  Success(email);
  Success(phone);
}
add.onclick= function() { 
  clearValidation();
  ena_method = "POST";
  clearform();
  form.classList.add("upper");
};

cancel.addEventListener("click", () => {
  clearform();
  form.classList.remove("upper");
});

submit.addEventListener("click", async () => {
  data = {
    firstName: firstName.value,
    lastName: lastName.value,
    dob: dob.value,
    email: email.value,
    phone: phone.value,
  };

  console.log(fnamecheck, lnamecheck, dobcheck, emailcheck, phonecheck);
  if (fnamecheck && lnamecheck && dobcheck && emailcheck && phonecheck) {
    if (ena_method == "PUT") {
      console.log(id);
      await fetch(`http://localhost:8000/user/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        clearform();
        form.classList.remove("upper");
        getting();
      });
    } else {
      await fetch("http://localhost:8000/user", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        clearform();
        form.classList.remove("upper");
        getting();
      });
    }
  }
});
function clearform() {
  firstName.value =
    lastName.value =
    dob.value =
    email.value =
    phone.value =
      null;
}
const getting = async () => {
  const response = await fetch("http://localhost:8000/user");
  const data = await response.json();
  summa = data;
  console.log(summa);
  updating();
};
getting();

const updating = async () => {
  let tableData = "";

  summa.forEach((result) => {
    let dob = new Date(result.dob);
    let formattedDob = `${dob.getDate().toString().padStart(2, "0")}-${(
      dob.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dob.getFullYear().toString().slice(-4)}`;
    tableData += `<tr id=${result._id} >
           
            <td>${result.firstName}</td>
            <td>${result.lastName}</td>
            <td>${formattedDob}</td>
            <td>${result.email}</td>
            <td>${result.phone}</td>
            <td>
              <button class="btn edit" onclick= editData(event)>Edit</button>
              <button class="btn btn-primary delete" onclick=deleteData(event)>Delete</button>
            </td>
          </tr>`;
  });
  document.getElementById("display").innerHTML = tableData;
};
updating();

function editData(event) {
  fnamecheck = lnamecheck = dobcheck = emailcheck = phonecheck = true;
  form.classList.add("upper");
  ena_method = "PUT";
  id = event.target.parentElement.parentElement.id;
  let ab = summa.filter((v) => {
    return v["_id"] == id;
  })[0];
  ({
    firstName: firstName.value,
    lastName: lastName.value,
    dob: dob.value,
    email: email.value,
    phone: phone.value,
  } = ab);
}

async function deleteData(event) {
  id = event.target.parentElement.parentElement.id;
  await fetch(`http://localhost:8000/user/${id}`, {
    method: "DELETE",
  }).then(() => {
    getting();
  });
}

