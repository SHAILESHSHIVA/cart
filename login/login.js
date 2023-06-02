let loginbtn = document.querySelector("#loginbtn");
let form = document.querySelector("form");

let email = document.querySelector("#email");
let pass = document.querySelector("#pass");

let errmsg = document.querySelector("#err-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (email.value == "" || pass.value == "") {
    errmsg.innerText = "All the fields are mandatory";
    errmsg.style.color = "red";
    errmsg.style.display = "inline-block";
    return;
  }

  if (!localStorage.getItem("users")) {
    errmsg.innerText = `${email.value} is not available,sign in first`;
    errmsg.style.color = "red";
    errmsg.style.display = "inline-block";
    return;
  } else {
    let users = JSON.parse(localStorage.getItem("users"));
    console.log(users);

    for (let user of users) {
      if (user.email == email.value && user.password == pass.value) {
        user.token = generateToken();
        localStorage.setItem("currentuser", JSON.stringify(user));

        errmsg.innerText = "Successfully Signed Up!";
        errmsg.style.color = "green";
        errmsg.style.display = "inline-block";

        setTimeout(() => {
          window.location.href = "../shop/shop.html";
        }, 1000);

        return;
      }
    }

    errmsg.innerText = `${email.value} is not available or wrong password entered`;
    errmsg.style.color = "red";
    errmsg.style.display = "inline-block";
    return;
  }
});

function generateToken() {
  let alpha = "0123456789ABCDEFGHIJabcdefghij";
  let token = "";
  for (let i = 0; i < 16; i++) {
    token += alpha.charAt(Math.floor(Math.random() * 30));
  }
  return token;
}
