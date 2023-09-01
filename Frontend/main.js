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
let fname = false;
let lname = false;
let dobcheck = false;
let emailc = false;
let phonec = false;

add.onclick = function () {
  ena_method = "POST";
  clearform();
  form.classList.add("upper");
};

cancel.onclick = function () {
  clearform();
  form.classList.remove("upper");
};

function change() {}
change();
function allowAlphaNumericSpace(thisInput) {
  thisInput.value = thisInput.value.split(/[^a-zA-Z0-9 ]/).join("");
}
submit.onclick = async function () {
  // data = {
  //   firstName: firstName.value,
  //   lastName: lastName.value,
  //   dob: dob.value,
  //   email: email.value,
  //   phone: phone.value,
  // };

  console.log(data);
  if (firstName.value) {
    const firstNameCheck = /^[a-zA-Z]+$/;

    if (!firstNameCheck.test(firstName.value) || firstName.value === "") {
      setError(firstName, "Enter a valid name");
    } else {
      data.firstName = firstName.value;
      fname = true;
      setSuccess(firstName);
    }
  }

  if (lastName.value) {
    const lastnamecheck = /^[a-zA-Z]+$/;

    if (!lastnamecheck.test(lastName.value) || lastName.value === "") {
      setError(lastName, "Enter a valid name");

      // inputControl.classList.remove('success')
    } else {
      data.lastName = lastName.value;
      lname = true;
      setSuccess(lastName);
    }
  }

  if (email.value) {
    const emailcheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailcheck.test(email.value) || email.value === "") {
      setError(email, "Enter a valid email address");
    } else {
      data.email = email.value;
      emailc = true;
      setSuccess(email);
    }
  }

  if (phone.value) {
    const phonecheck = /^(0|91)?[6-9][0-9]{9}$/;

    if (!phonecheck.test(phone.value) || phone.value === "") {
      setError(phone, "Invalid phone number");
    } else {
      data.phone = phone.value;
      phonec = true;
      setSuccess(phone);
    }
  }
  data.dob = dob.value;
  if (fname && lname && emailc && phonec) {
    console.log(ena_method);
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
};
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
  updating();
};
getting();

const updating = async () => {
  let tableData = "";
  summa.forEach((result) => {
    tableData += `<tr id=${result._id} >
           
            <td>${result.firstName}</td>
            <td>${result.lastName}</td>
            <td>${result.dob}</td>
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
  setSuccess(event)
  console.log(event.target.parentElement.parentElement.id);
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
  event;
  console.log(event);
  console.log(event.target.parentElement.parentElement.id);
  id = event.target.parentElement.parentElement.id;
  await fetch(`http://localhost:8000/user/${id}`, {
    method: "DELETE",
  }).then(() => {
    getting();
  });
}

const setError = (element, message) => {
  const inputControl = element.parentElement;
  console.log(inputControl);
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
};

const setSuccess = (element) => {
  console.log(element);
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.remove("error");
};
