if (!localStorage.getItem("currentuser")) {
  alert("you need to login or signup first to see the cart");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
}

let cardproductscont = document.querySelector(".products");

let cartproducts = JSON.parse(localStorage.getItem("cartproducts"));
console.log(cartproducts);

function printData(cartproducts) {
  if (cartproducts.length == 0) {
    cardproductscont.innerHTML =
      "<h3 style='margin:auto'>Cart is Empty please do some shopping........</h3>";
    return;
  }

  let str = "";
  for (let product of cartproducts) {
    str += `
           <div class="item">
           <img src=${product.image} />
           <div class="info">
             <div class="card-title">${product.title}</div>
             <div class="row">
               <div class="price">$${product.price}</div>
               <div class="sized">${product.sizes}</div>
             </div>
             <div class="colors">
               Colors:
               <div class="row">                      
                 <div class="circle" style="background-color: #000"></div>
                 <div class="circle" style="background-color: #4938af"></div>
                 <div class="circle" style="background-color: #203d3e"></div>
               </div>
             </div>
             <div class="row">Rating: ${ratingstars(product.rating.rate)}</div>
             <button class='removebtn' id="addBtn-${
               product.id
             }" onclick="removefromcartfunc(event)">Remove From Cart</button>
           </div>
           
         
         </div>
        `;
  }

  cardproductscont.innerHTML = str;
}

function ratingstars(rating) {
  rating = Math.round(rating);
  let str = "";
  for (let i = 0; i < rating; i++) {
    str += "⭐";
  }

  return str;
}

printData(cartproducts);

function removefromcartfunc(event) {
  let id = Number(event.target.getAttribute("id").split("-")[1]);

  for (let i = 0; i < cartproducts.length; i++) {
    if (cartproducts[i].id == id) {
      cartproducts.splice(i, 1);
      console.log(cartproducts);
    }
  }

  printData(cartproducts);
  printcheckoutlist(cartproducts);

  localStorage.setItem("cartproducts", JSON.stringify(cartproducts));
}

let checkoutlistcont = document.querySelector(".checkoutlist");

function printcheckoutlist(cartproducts) {
  if (cartproducts.length == 0) {
    let chkout = document.querySelector(".checkout");
    chkout.innerHTML = "";
    return;
  } else {
    let str = `
       <h2>Checkout List</h2>
      `;
    let i = 1;
    let total = 0;
    for (let product of cartproducts) {
      str += `
         <div class="row-ele">
         <span>${i}.${product.title}</span>
         <span>$${product.price}</span>
         </div>
         `;
      i++;
      total += product.price;
    }
    total = Math.round(total * 100) / 100;
    str += `
      <div class="row-ele total">
      <span>Total(USD)</span>
      <span>$${total}</span>
      </div>
      <div class="checkout-btn-cont">
      <button class="checkout-btn"> Click To Checkout</button>
      </div>
      `;

    checkoutlistcont.innerHTML = str;
  }
}

printcheckoutlist(cartproducts);

function giveprice(cartproducts) {
  let total = 0;
  for (let product of cartproducts) {
    total += product.price;
  }
  total = Math.round(total * 100) / 100;
  return total;
}

document.querySelector(".checkout-btn").addEventListener("click", function (e) {
  localStorage.setItem("total", JSON.stringify(giveprice(cartproducts)));
  cartproducts = [];
  printData(cartproducts);
  printcheckoutlist(cartproducts);
  window.open("../razorpay/razorpay.html", "_blank");
});
