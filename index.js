document.addEventListener("DOMContentLoaded", initialise);
let allProducts;
function initialise() {
  fetchProducts();
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
     <p class="card-desc">
     ${category.toUpperCase()}
     </p> 
     <div class="btn-container">
     <button class="card-btn hide">Add to Cart</button>
     </div>
     `;
      // 5 - append to #list
      list.appendChild(li);
    });
  }
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
      <p class="card-desc">
        ${category.toUpperCase()}
      </p> 
      <div class="btn-container">
       <button class="card-btn hide">Add to Cart</button>
      </div>

    `;
      list.appendChild(li);
    })
    .join("");
}
