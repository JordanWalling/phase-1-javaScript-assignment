document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
  fetchProducts();
}

async function fetchProducts() {
  const resp = await fetch("https://fakestoreapi.com/products");
  const data = await resp.json();
  displayProducts(data);
}

function displayProducts(products) {
  const list = document.querySelector("#list");
  products
    .map((product) => {
      console.log(product);
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
