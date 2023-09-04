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

function NameValidation(element) {
  const name = /^[A-Za-z]+$/;
  if (!name.test(firstName.value || lastName.value)) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "Enter a valid name";
    inputControl.classList.add("error");
  } else {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = "";
    inputControl.classList.remove("error");
  }
}

async function EmailValidation(element) {
  // var email = email.value; // Get the email value
  const emailcheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  console.log(email.value);

  if (!emailcheck.test(email.value)) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "Enter a valid email address";
    inputControl.classList.add("error");
  } else {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");  

    try {
      console.log("asdaf");
      const response = await fetch(`http://localhost:8000/user/checkEmail?email=${encodeURIComponent(email.value)}`, {
          method: 'GET',
        });

      const data = await response.json();
      console.log(data);

      if (data.exists) {
        errorDisplay.innerText = "Email already exists";
        inputControl.classList.add("error");
      } else {
        errorDisplay.innerText = ""; // Clear the error message if email is valid and doesn't exist
        inputControl.classList.remove("error");
      }
    } catch (error) {
      console.error(error);
      errorDisplay.innerText = "An error occurred";
    }
  }
}

add.onclick = function () {
  ena_method = "POST";
  clearform();
  form.classList.add("upper");
};

cancel.onclick = function () {
  clearform();
  form.classList.remove("upper");
};

submit.onclick = async function () {
  data = {
    firstName: firstName.value,
    lastName: lastName.value,
    dob: dob.value,
    email: email.value,
    phone: phone.value,
  };

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
  id = event.target.parentElement.parentElement.id;
  await fetch(`http://localhost:8000/user/${id}`, {
    method: "DELETE",
  }).then(() => {
    getting();
  });
}
