document.addEventListener("DOMContentLoaded", initialise);
let allProducts;
let cart = [];
function initialise() {
  fetchProducts();
  filterCategories();
  searchProduct();
  navScroll();
  openCart();
  onCardButtonClick();
  displayCartItems();
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
      const { image, category, price, title } = product;
      const li = document.createElement("li");
      li.classList.add("card");
      li.innerHTML = `

    <div class="img-content">
      <img src=${image} alt=${category} />
    </div>
    <div class="card-content">
      <p class="card-price">$${Math.round(price)}</p>
      <h4 class="card-title">${title.substring(0, 45)}...</h4>
      <p class="card-desc hide">
        ${category.toUpperCase()}
      </p> 
      <div class="btn-container">
       <button class="card-btn hide">Add to Cart</button>
      </div>

    `;
      li.addEventListener("mouseenter", (e) => {
        let cardContent = e.target.children[1];
        const btnContainer = cardContent.children[3];
        const btn = btnContainer.children[0];

        btn.classList.remove("hide");
      });
      li.addEventListener("mouseleave", (e) => {
        let cardContent = e.target.children[1];
        const btnContainer = cardContent.children[3];
        const btn = btnContainer.children[0];
        btn.classList.add("hide");
      });

      list.appendChild(li);
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
    content.map((product) => {
      const { image, price, category, title } = product;
      const li = document.createElement("li");
      li.classList.add("card");
      li.innerHTML = `
         <div class="img-content">
         <img src=${image} alt=${category} />
         </div>
         <div class="card-content">
         <p class="card-price">$${Math.round(price)}</p>
         <h4 class="card-title">${title.substring(0, 45)}...</h4>
         <p class="card-desc hide">
         ${category.toUpperCase()}
         </p> 
         <div class="btn-container">
         <button class="card-btn hide">Add to Cart</button>
         </div>
         `;
      li.addEventListener("mouseenter", (e) => {
        let cardContent = e.target.children[1];
        const btnContainer = cardContent.children[3];
        const btn = btnContainer.children[0];
        btn.classList.remove("hide");
      });
      li.addEventListener("mouseleave", (e) => {
        let cardContent = e.target.children[1];
        const btnContainer = cardContent.children[3];
        const btn = btnContainer.children[0];
        btn.classList.add("hide");
      });
      // 5 - append to #list
      list.appendChild(li);
    });
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
    content.map((product) => {
      const { image, price, category, title } = product;
      const li = document.createElement("li");
      li.classList.add("card");
      li.innerHTML = `
        <div class="img-content">
        <img src=${image} alt=${category} />
        </div>
        <div class="card-content">
        <p class="card-price">$${Math.round(price)}</p>
        <h4 class="card-title">${title.substring(0, 45)}...</h4>
        <p class="card-desc hide">
        ${category.toUpperCase()}
        </p> 
        <div class="btn-container">
        <button class="card-btn hide">Add to Cart</button>
        </div>
        `;
      li.addEventListener("mouseenter", (e) => {
        let cardContent = e.target.children[1];
        const btnContainer = cardContent.children[3];
        const btn = btnContainer.children[0];
        btn.classList.remove("hide");
      });
      li.addEventListener("mouseleave", (e) => {
        let cardContent = e.target.children[1];
        const btnContainer = cardContent.children[3];
        const btn = btnContainer.children[0];
        btn.classList.add("hide");
      });
      // 5 - append to #list
      list.appendChild(li);
    });
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
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    closeModal();
  });
}

function closeModal() {
  const cartModal = document.querySelector(".modal");
  cartModal.classList.add("hide");
}

function seeModal() {
  const cartModal = document.querySelector(".modal");
  cartModal.classList.remove("hide");
  if (!cartModal.classList.contains("hide")) {
    const modalOverlay = document.querySelector(".modal");
    modalOverlay.addEventListener("click", closeModal);
  }
}

function onCardButtonClick() {
  const list = document.querySelector("#list");
  list.addEventListener("click", (e) => {
    if (e.target.className === "card-btn") {
      const cardContent = e.target.parentElement.parentElement;

      const cardPrice = cardContent.querySelector(".card-price").textContent;
      const cardTitle = cardContent.querySelector(".card-title").textContent;

      cart.push({ title: cardTitle, price: cardPrice });
      e.target.setAttribute("disabled", "disabled");
      e.target.style.backgroundColor = "grey";
      e.target.style.color = "white";
      console.log(cart);
      displayCartItems();
    }
  });
}

function displayCartItems() {
  const cartList = document.querySelector("#cart-list");

  cartList.innerHTML = "";
  cart.map((item) => {
    const { price, title } = item;
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    h3.textContent = title;
    p.textContent = price;

    li.appendChild(h3);
    li.appendChild(p);

    cartList.appendChild(li);
  });
}
