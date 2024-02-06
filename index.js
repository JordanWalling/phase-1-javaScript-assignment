document.addEventListener("DOMContentLoaded", initialise);
let allProducts;
let cart = [];

function initialise() {
  fetchProducts();
  filterCategories();
  searchProduct();
  navScroll();
  openCart();
  shoppingCart();
}

async function fetchProducts() {
  const resp = await fetch("https://fakestoreapi.com/products");
  const data = await resp.json();
  allProducts = data;
  displayProducts(allProducts);
}

function displayProducts(products) {
  const list = document.querySelector("#list");
  products
    .map((product) => {
      // console.log(product);
      const { image, category, price, title, id } = product;
      list.innerHTML +=
        // const li = document.createElement("li");
        // li.classList.add("card");
        `
     <li class="card">
     
     <div class="img-content">
     <img src=${image} alt=${category} />
     </div>
     <div class="card-content">
     <p class="card-price">$${price}</p>
     <h4 class="card-title">${title.substring(0, 45)}...</h4>
     <p class="card-desc hide">
     ${category.toUpperCase()}
     </p> 
     <div class="btn-container">
     <button class="card-btn" onclick="addToCart(${id})">Add to Cart</button>
     </div>
     </li>
     
    `;
      // li.addEventListener("mouseenter", (e) => {
      //   let cardContent = e.target.children[1];
      //   const btnContainer = cardContent.children[3];
      //   const btn = btnContainer.children[0];

      //   btn.classList.remove("hide");
      // });
      // li.addEventListener("mouseleave", (e) => {
      //   let cardContent = e.target.children[1];
      //   const btnContainer = cardContent.children[3];
      //   const btn = btnContainer.children[0];
      //   btn.classList.add("hide");
      // });

      // list.appendChild(li);
    })
    .join("");
}

function filterCategories() {
  // 1 - select the select element
  const select = document.querySelector("#filter-btn");
  // 2 - add onchange event listener
  select.addEventListener("change", filterProducts);

  // 3 - create filter function
  function filterProducts(e) {
    let list = document.querySelector("#list");
    let content;
    let option = e.target.value;

    list.innerHTML = "";

    switch (option) {
      case "all":
        content = allProducts;
        break;
      case "men":
        content = allProducts.filter((product) => {
          return product.category === "men's clothing";
        });
        break;
      case "women":
        content = allProducts.filter((product) => {
          return product.category === "women's clothing";
        });
        break;
      case "jewellery":
        content = allProducts.filter((product) => {
          return product.category === "jewelery";
        });
        break;
      case "electronics":
        content = allProducts.filter((product) => {
          return product.category === "electronics";
        });
        break;
      default:
        content = allProducts;
    }
    // 4- create li element for each product
    content
      .map((product) => {
        const { image, category, price, title, id } = product;
        list.innerHTML += `
    <li class="card">
    
    <div class="img-content">
    <img src=${image} alt=${category} />
    </div>
    <div class="card-content">
    <p class="card-price">$${price}</p>
    <h4 class="card-title">${title.substring(0, 45)}...</h4>
    <p class="card-desc hide">
    ${category.toUpperCase()}
    </p> 
    <div class="btn-container">
    <button class="card-btn" onclick="addToCart(${id})">Add to Cart</button>
    </div>
    </li>
    
   `;
        // li.addEventListener("mouseenter", (e) => {
        //   let cardContent = e.target.children[1];
        //   const btnContainer = cardContent.children[3];
        //   const btn = btnContainer.children[0];
        //   btn.classList.remove("hide");
        // });
        // li.addEventListener("mouseleave", (e) => {
        //   let cardContent = e.target.children[1];
        //   const btnContainer = cardContent.children[3];
        //   const btn = btnContainer.children[0];
        //   btn.classList.add("hide");
        // });
        // // 5 - append to #list
        // list.appendChild(li);
      })
      .join("");
  }
}

function searchProduct() {
  // 1. Select element
  const searchInput = document.querySelector("#search-input");
  const list = document.querySelector("#list");
  // 2. add event listener
  searchInput.addEventListener("keyup", (e) => {
    list.innerHTML = "";
    // 3. get value from input
    let searchTerm = e.target.value;
    // 4. filter products array and return filtered products
    let content = allProducts.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm);
    });
    content
      .map((product) => {
        const { image, price, category, title, id } = product;
        list.innerHTML += `
    <li class="card">
    
    <div class="img-content">
    <img src=${image} alt=${category} />
    </div>
    <div class="card-content">
    <p class="card-price">$${price}</p>
    <h4 class="card-title">${title.substring(0, 45)}...</h4>
    <p class="card-desc hide">
    ${category.toUpperCase()}
    </p> 
    <div class="btn-container">
    <button class="card-btn" onclick="addToCart(${id})">Add to Cart</button>
    </div>
    </li>
    
   `;
        // li.addEventListener("mouseenter", (e) => {
        //   let cardContent = e.target.children[1];
        //   const btnContainer = cardContent.children[3];
        //   const btn = btnContainer.children[0];
        //   btn.classList.remove("hide");
        // });
        // li.addEventListener("mouseleave", (e) => {
        //   let cardContent = e.target.children[1];
        //   const btnContainer = cardContent.children[3];
        //   const btn = btnContainer.children[0];
        //   btn.classList.add("hide");
        // });
        // // 5 - append to #list
        // list.appendChild(li);
      })
      .join("");
  });
}

function navScroll() {
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

function openCart() {
  const cartBtn = document.querySelector(".cart-container");

  cartBtn.addEventListener("click", () => {
    seeModal();
  });
}

const closeBtn = document.querySelector(".fa-xmark");
closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeModal(e);
});
function closeModal(e) {
  const body = document.body;
  const cartModal = document.querySelector(".modal");
  if (e.target.classList[0] === "modal-content") {
    return;
  }
  cartModal.classList.add("hide");
  body.classList.remove("modal-open");
}

function seeModal() {
  const body = document.body;
  const cartModal = document.querySelector(".modal");
  cartModal.classList.remove("hide");
  body.classList.add("modal-open");

  // if (!cartModal.classList.contains("hide")) {
  //   const modalOverlay = document.querySelector(".modal");
  //   modalOverlay.addEventListener("click", closeModal);
  // }
}

function addToCart(id) {
  const searchCart = cart.find((product) => product.id === id);
  if (searchCart) {
    alert("Product already added to the cart");
  } else {
    const oldProduct = allProducts.find((product) => product.id === id);
    // const { title, price, id } = oldProduct;
    cart.push({ ...oldProduct, quantity: 1 });
  }
  console.log(cart);
  shoppingCart();
}

function shoppingCart() {
  const cartList = document.querySelector("#cart-list");
  const cartTotal = document.querySelector("#cart-total");
  let cartHTML = "";

  cart
    .map((product) => {
      const { title, price, quantity, id } = product;
      cartHTML += `
   <li id="${id}">
    <h3>${title}</h3>
    <p>Price: $${price}</p>
    <p>Quantity: ${quantity}</p>
    <button onclick="increment(${id}, event)">+</button>
    <button onclick="decrement(${id}, event)">-</button>
    <button onclick="deleteCartItem(${id}, event)">X</button>
    <p id="item-total">Item total: $${price * quantity}</p>
   </li>
  `;
    })
    .join("");
  cartList.innerHTML = cartHTML;

  const itemTotals = document.querySelectorAll("#item-total");
  let sum = 0;
  itemTotals.forEach((itemTotal) => {
    const numericValue = itemTotal.innerHTML;
    const index = numericValue.indexOf("$");
    sum += Number(numericValue.slice(index + 1));
  });
  cartTotal.innerHTML =
    sum > 0 ? `Total price: $${sum}` : `No items in the cart`;
}

function increment(id, event) {
  const cartProduct = cart.find((product) => product.id === id);
  if (cartProduct) {
    cartProduct.quantity++;
  }
  shoppingCart();
  event.stopPropagation();
}
function decrement(id, event) {
  const cartProduct = cart.find((product) => product.id === id);
  if (cartProduct && cartProduct.quantity > 1) {
    cartProduct.quantity--;
  }
  shoppingCart();
  event.stopPropagation();
}

function deleteCartItem(id, event) {
  cart = cart.filter((product) => product.id !== id);

  shoppingCart();
  event.stopPropagation();
}
// function displayCartItems() {
//  const cartList = document.querySelector("#cart-list");
//  let h4 = document.createElement("h4");

//  cartList.innerHTML = "";
//  let cartTotal = 0;

//  cart.map((item, index) => {
//   const { price, title } = item;

//   const li = document.createElement("li");
//   const h3 = document.createElement("h3");
//   const p = document.createElement("p");
//   const p1 = document.createElement("p");
//   const btn = document.createElement("button");
//   const div = document.createElement("div");
//   div.classList.add("item-container");

//   p1.textContent = index + 1;
//   h3.textContent = title;
//   p.textContent = price;
//   btn.textContent = "X";
//   btn.addEventListener("click", (e) => {
//    // stopPropagation prevents modal from closing
//    e.stopPropagation();
//    cart.splice(index, 1);

//    displayCartItems();
//   });
//   div.appendChild(p1);
//   div.appendChild(h3);
//   div.appendChild(p);
//   div.appendChild(btn);
//   li.appendChild(div);

//   cartList.appendChild(li);

//   // cartTotalPrice.map((item) => {
//    //   cartTotal += item;
//    // });

//    cartTotal += Number(price.slice(1));
//   });
//   h4.innerHTML = `Total: $${cartTotal}`;
//   cartList.appendChild(h4);

//   cartTotalPrice = [];
//  }

// function onCardButtonClick() {
//   const list = document.querySelector("#list");
//   list.addEventListener("click", (e) => {
//     if (e.target.className === "card-btn") {
//       const cardContent = e.target.parentElement.parentElement;

//       const cardPrice = cardContent.querySelector(".card-price").textContent;
//       const cardTitle = cardContent.querySelector(".card-title").textContent;

//       cart.push({ title: cardTitle, price: cardPrice });
//       cartTotalPrice.push(Number(cardPrice.slice(1)));
//       e.target.setAttribute("disabled", "disabled");
//       e.target.style.backgroundColor = "grey";
//       e.target.style.color = "white";
//       // console.log(cart);
//       // console.log(cartTotalPrice);
//       displayCartItems();
//     }
//   });
// }

// ============================================================

//                          OLD CODE

// ============================================================

// document.addEventListener("DOMContentLoaded", initialise);
// let allProducts;
// let cart = [];
// let cartTotalPrice = [];
// function initialise() {
//   fetchProducts();
//   filterCategories();
//   searchProduct();
//   navScroll();
//   openCart();
//   onCardButtonClick();
//   displayCartItems();
// }

// async function fetchProducts() {
//   const resp = await fetch("https://fakestoreapi.com/products");
//   const data = await resp.json();
//   allProducts = data;
//   displayProducts(allProducts);
// }

// function displayProducts(products) {
//   const list = document.querySelector("#list");
//   products
//     .map((product) => {
//       // console.log(product);
//       const { image, category, price, title } = product;
//       const li = document.createElement("li");
//       li.classList.add("card");
//       li.innerHTML = `

//     <div class="img-content">
//       <img src=${image} alt=${category} />
//     </div>
//     <div class="card-content">
//       <p class="card-price">$${Math.round(price)}</p>
//       <h4 class="card-title">${title.substring(0, 45)}...</h4>
//       <p class="card-desc hide">
//         ${category.toUpperCase()}
//       </p>
//       <div class="btn-container">
//        <button class="card-btn hide">Add to Cart</button>
//       </div>

//     `;
//       li.addEventListener("mouseenter", (e) => {
//         let cardContent = e.target.children[1];
//         const btnContainer = cardContent.children[3];
//         const btn = btnContainer.children[0];

//         btn.classList.remove("hide");
//       });
//       li.addEventListener("mouseleave", (e) => {
//         let cardContent = e.target.children[1];
//         const btnContainer = cardContent.children[3];
//         const btn = btnContainer.children[0];
//         btn.classList.add("hide");
//       });

//       list.appendChild(li);
//     })
//     .join("");
// }

// function filterCategories() {
//   // 1 - select the select element
//   const select = document.querySelector("#filter-btn");
//   // 2 - add onchange event listener
//   select.addEventListener("change", filterProducts);

//   // 3 - create filter function
//   function filterProducts(e) {
//     let list = document.querySelector("#list");
//     let content;
//     let option = e.target.value;

//     list.innerHTML = "";

//     switch (option) {
//       case "all":
//         content = allProducts;
//         break;
//       case "men":
//         content = allProducts.filter((product) => {
//           return product.category === "men's clothing";
//         });
//         break;
//       case "women":
//         content = allProducts.filter((product) => {
//           return product.category === "women's clothing";
//         });
//         break;
//       case "jewellery":
//         content = allProducts.filter((product) => {
//           return product.category === "jewelery";
//         });
//         break;
//       case "electronics":
//         content = allProducts.filter((product) => {
//           return product.category === "electronics";
//         });
//         break;
//       default:
//         content = allProducts;
//     }
//     // 4- create li element for each product
//     content.map((product) => {
//       const { image, price, category, title } = product;
//       const li = document.createElement("li");
//       li.classList.add("card");
//       li.innerHTML = `
//          <div class="img-content">
//          <img src=${image} alt=${category} />
//          </div>
//          <div class="card-content">
//          <p class="card-price">$${Math.round(price)}</p>
//          <h4 class="card-title">${title.substring(0, 45)}...</h4>
//          <p class="card-desc hide">
//          ${category.toUpperCase()}
//          </p>
//          <div class="btn-container">
//          <button class="card-btn hide">Add to Cart</button>
//          </div>
//          `;
//       li.addEventListener("mouseenter", (e) => {
//         let cardContent = e.target.children[1];
//         const btnContainer = cardContent.children[3];
//         const btn = btnContainer.children[0];
//         btn.classList.remove("hide");
//       });
//       li.addEventListener("mouseleave", (e) => {
//         let cardContent = e.target.children[1];
//         const btnContainer = cardContent.children[3];
//         const btn = btnContainer.children[0];
//         btn.classList.add("hide");
//       });
//       // 5 - append to #list
//       list.appendChild(li);
//     });
//   }
// }

// function searchProduct() {
//   // 1. Select element
//   const searchInput = document.querySelector("#search-input");
//   const list = document.querySelector("#list");
//   // 2. add event listener
//   searchInput.addEventListener("keyup", (e) => {
//     list.innerHTML = "";
//     // 3. get value from input
//     let searchTerm = e.target.value;
//     // 4. filter products array and return filtered products
//     let content = allProducts.filter((product) => {
//       return product.title.toLowerCase().includes(searchTerm);
//     });
//     content.map((product) => {
//       const { image, price, category, title } = product;
//       const li = document.createElement("li");
//       li.classList.add("card");
//       li.innerHTML = `
//         <div class="img-content">
//         <img src=${image} alt=${category} />
//         </div>
//         <div class="card-content">
//         <p class="card-price">$${Math.round(price)}</p>
//         <h4 class="card-title">${title.substring(0, 45)}...</h4>
//         <p class="card-desc hide">
//         ${category.toUpperCase()}
//         </p>
//         <div class="btn-container">
//         <button class="card-btn hide">Add to Cart</button>
//         </div>
//         `;
//       li.addEventListener("mouseenter", (e) => {
//         let cardContent = e.target.children[1];
//         const btnContainer = cardContent.children[3];
//         const btn = btnContainer.children[0];
//         btn.classList.remove("hide");
//       });
//       li.addEventListener("mouseleave", (e) => {
//         let cardContent = e.target.children[1];
//         const btnContainer = cardContent.children[3];
//         const btn = btnContainer.children[0];
//         btn.classList.add("hide");
//       });
//       // 5 - append to #list
//       list.appendChild(li);
//     });
//   });
// }

// function navScroll() {
//   const nav = document.querySelector("nav");
//   window.addEventListener("scroll", () => {
//     const scrollPosition = window.scrollY;
//     if (scrollPosition > 20) {
//       nav.classList.add("scrolled");
//     } else {
//       nav.classList.remove("scrolled");
//     }
//   });
// }

// function openCart() {
//   const cartBtn = document.querySelector(".cart-container");

//   cartBtn.addEventListener("click", () => {
//     seeModal();
//   });
//   const closeBtn = document.querySelector(".close");
//   closeBtn.addEventListener("click", () => {
//     closeModal();
//   });
// }

// function closeModal() {
//   const body = document.body;
//   const cartModal = document.querySelector(".modal");
//   cartModal.classList.add("hide");
//   body.classList.remove("modal-open");
// }

// function seeModal() {
//   const body = document.body;
//   const cartModal = document.querySelector(".modal");
//   cartModal.classList.remove("hide");
//   body.classList.add("modal-open");

//   if (!cartModal.classList.contains("hide")) {
//     const modalOverlay = document.querySelector(".modal");
//     modalOverlay.addEventListener("click", closeModal);
//   }
// }

// function onCardButtonClick() {
//   const list = document.querySelector("#list");
//   list.addEventListener("click", (e) => {
//     if (e.target.className === "card-btn") {
//       const cardContent = e.target.parentElement.parentElement;

//       const cardPrice = cardContent.querySelector(".card-price").textContent;
//       const cardTitle = cardContent.querySelector(".card-title").textContent;

//       cart.push({ title: cardTitle, price: cardPrice });
//       cartTotalPrice.push(Number(cardPrice.slice(1)));
//       e.target.setAttribute("disabled", "disabled");
//       e.target.style.backgroundColor = "grey";
//       e.target.style.color = "white";
//       // console.log(cart);
//       // console.log(cartTotalPrice);
//       displayCartItems();
//     }
//   });
// }

// function displayCartItems() {
//   const cartList = document.querySelector("#cart-list");
//   let h4 = document.createElement("h4");

//   cartList.innerHTML = "";
//   let cartTotal = 0;

//   cart.map((item, index) => {
//     const { price, title } = item;

//     const li = document.createElement("li");
//     const h3 = document.createElement("h3");
//     const p = document.createElement("p");
//     const p1 = document.createElement("p");
//     const btn = document.createElement("button");
//     const div = document.createElement("div");
//     div.classList.add("item-container");

//     p1.textContent = index + 1;
//     h3.textContent = title;
//     p.textContent = price;
//     btn.textContent = "X";
//     btn.addEventListener("click", (e) => {
//       // stopPropagation prevents modal from closing
//       e.stopPropagation();
//       cart.splice(index, 1);

//       displayCartItems();
//     });
//     div.appendChild(p1);
//     div.appendChild(h3);
//     div.appendChild(p);
//     div.appendChild(btn);
//     li.appendChild(div);

//     cartList.appendChild(li);

//     // cartTotalPrice.map((item) => {
//     //   cartTotal += item;
//     // });

//     cartTotal += Number(price.slice(1));
//   });
//   h4.innerHTML = `Total: $${cartTotal}`;
//   cartList.appendChild(h4);

//   cartTotalPrice = [];
// }
