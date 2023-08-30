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

add.onclick = function () {
  ena_method = "POST";
  form.classList.add("upper");
};

cancel.onclick = function () {
  form.classList.remove("upper");
};

submit.onclick = async function () {
  // (data.firstName = firstName.value),
    (data.lastName = lastName.value),
    (data.dob = dob.value),
    (data.email = email.value),
    (data.phone = phone.value);
    const firstNameCheck = /^[a-zA-Z]+$/;
            
            if (!firstNameCheck.test(firstName.value)) {
               alert("Please enter only alphabetic characters for  First Name: " + firstName.value);
            } else {
              data.firstName = firstName.value;
            }
            const latNameCheck = /^[a-zA-Z]+$/;
            
            if (!latNameCheck.test(lastName.value)) {
               alert("Please enter only alphabetic characters for Last Name: " +lastName.value);
            } else {
              data.firstName = firstName.value;
            }
            
            
  if(data.firstName && data.lastName && data.dob && data.email && data.phone) {
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
  }}
};
function clearform() {
  firstName.value = null;
  lastName.value = null;
  dob.value = null;
  email.value = null;
  phone.value = null;
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
  form.classList.add("upper");
  ena_method = "PUT";
  id = event.target.parentElement.parentElement.id;
  let ab = summa.filter((v) => {
    return v["_id"] == id;
  })[0];
  console.log(ab._id);
  firstName.value = ab.firstName;
  lastName.value = ab.lastName;
  dob.value = ab.dob;
  email.value = ab.email;
  phone.value = ab.phone;
}

async function deleteData(event) {
  console.log(event.target.parentElement.parentElement.id);
  id = event.target.parentElement.parentElement.id;
  await fetch(`http://localhost:8000/user/${id}`, {
    method: "DELETE",
  }).then(() => {
    getting();
  });
}
