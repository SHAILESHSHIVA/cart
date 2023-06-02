let signupbtn = document.querySelector("#signupbtn");
let form = document.querySelector("form");

let fname = document.querySelector("#firstname");
let lname = document.querySelector("#lastname");
let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let cpass = document.querySelector("#cpass");
let errmsg = document.querySelector("#err-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    fname.value == "" ||
    lname.value == "" ||
    email.value == "" ||
    pass.value == "" ||
    cpass.value == ""
  ) {
    errmsg.innerText = "All the fields are mandatory";
    errmsg.style.color = "red";
    errmsg.style.display = "inline-block";
    return;
  }

  if (pass.value != cpass.value) {
    errmsg.innerText = "Password not matching";
    errmsg.style.color = "red";
    errmsg.style.display = "inline-block";
    return;
  }

  let user = {
    firstname: fname.value,
    lastname: lname.value,
    email: email.value,
    password: pass.value,
  };

  console.log(user);

  if (!localStorage.getItem("users")) {
    let users = [];
    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));
  } else {
    let users = JSON.parse(localStorage.getItem("users"));
    console.log(users);

    for (let user of users) {
      if (user.email === email.value) {
        console.log("hi");
        errmsg.innerText = `User with email ${user.email} already exists`;
        errmsg.style.color = "green";
        errmsg.style.display = "inline-block";
        return;
      }
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  user.token = generateToken();
  localStorage.setItem("currentuser", JSON.stringify(user));

  errmsg.innerText = "Successfully Signed Up!";
  errmsg.style.color = "green";
  errmsg.style.display = "inline-block";

  setTimeout(() => {
    window.location.href = "../shop/shop.html";
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
