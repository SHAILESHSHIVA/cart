// Write your script here
if (!localStorage.getItem("currentuser")) {
  alert("you need to signup or login first");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
}

let saveinfobtn = document.querySelector("#saveinfo");
let logoutbtn = document.querySelector("#logoutbtn");
let form1 = document.querySelector("#profile1");

let fname = document.querySelector("#firstname");
let lname = document.querySelector("#lastname");

let oldpass = document.querySelector("#oldpass");
let newpass = document.querySelector("#newpass");
let cnewpass = document.querySelector("#cnewpass");

let changepassbtn = document.querySelector("#changepassbtn");
let errmsg1 = document.querySelector("#err-msg1");
let errmsg2 = document.querySelector("#err-msg2");

let currentuser = JSON.parse(localStorage.getItem("currentuser"));
// console.log("currentuser", currentuser);
fname.value = currentuser.firstname;
lname.value = currentuser.lastname;

let profilehdr = document.querySelector(".hdr");

profilehdr.innerHTML = `Welcome "${currentuser.firstname} ${currentuser.lastname}"`;

saveinfobtn.addEventListener("click", () => {
  let users = JSON.parse(localStorage.getItem("users"));

  for (let i = 0; i < users.length; i++) {
    if (users[i].email == currentuser.email) {
      currentuser = {
        firstname: fname.value,
        lastname: lname.value,
        email: users[i].email,
        password: users[i].password,
      };

      users.splice(i, 1, currentuser);
      break;
    }
  }

  errmsg1.innerText = "Sucessfully updated";
  errmsg1.style.color = "green";
  errmsg1.style.display = "inline-block";
  localStorage.setItem("users", JSON.stringify(users));

  currentuser.token = generateToken();
  localStorage.setItem("currentuser", JSON.stringify(currentuser));
});

changepassbtn.addEventListener("click", () => {
  if (oldpass.value == "" || newpass.value == "" || cnewpass.value == "") {
    errmsg2.innerText = "All the fields are mandatory";
    errmsg2.style.color = "red";
    errmsg2.style.display = "inline-block";
    return;
  }

  if (oldpass.value == newpass.value) {
    errmsg2.innerText = "New Password matching with old password";
    errmsg2.style.color = "red";
    errmsg2.style.display = "inline-block";
    return;
  }

  if (newpass.value != cnewpass.value) {
    errmsg2.innerText = "confirm password not matching with new password";
    errmsg2.style.color = "red";
    errmsg2.style.display = "inline-block";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users"));

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email == currentuser.email &&
      users[i].password == oldpass.value
    ) {
      currentuser = {
        firstname: users[i].firstname,
        lastname: users[i].lastname,
        email: users[i].email,
        password: newpass.value,
      };

      users.splice(i, 1, currentuser);

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentuser", JSON.stringify(currentuser));

      errmsg2.innerText = "Password changed successfully";
      errmsg2.style.color = "green";
      errmsg2.style.display = "inline-block";

      return;
    }
  }

  errmsg2.innerText = "old password not matching with existing password";
  errmsg2.style.color = "red";
  errmsg2.style.display = "inline-block";
});

logoutbtn.addEventListener("click", () => {
  localStorage.removeItem("currentuser");
  localStorage.removeItem("cartproducts");
  localStorage.removeItem("products");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
});

function generateToken() {
  let alpha = "0123456789ABCDEFGHIJabcdefghij";
  let token = "";
  for (let i = 0; i < 16; i++) {
    token += alpha.charAt(Math.floor(Math.random() * 30));
  }
  return token;
}
