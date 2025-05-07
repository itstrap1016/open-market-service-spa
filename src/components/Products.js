import { getProducts } from "../api/productApi.js";

const createProduct = (data) => {
  return `
    <li>
      <a href="/product/${data.id}">
        <div class="img-wrapper">
          <img src="${data.image}" alt="${data.name}"/>
        </div>
        <p class="seller">${data.seller.store_name}</p>
        <h3 class="name">${data.name}</h3>
        <p class="price"><span>${data.price.toLocaleString()}</span><span>원</span></p>
      </a>
    </li>
  `;
};

const createProducts = async () => {
  const data = await getProducts();
  const products = data.results;
  const $section = document.createElement("section");
  const $h2 = document.createElement("h2");
  const $ul = document.createElement("ul");
  $h2.textContent = "제품 리스트";
  $h2.classList.add("sr-only");
  $section.append($h2);
  $section.append($ul);
  $ul.classList.add("products-list");
  for (let i = 0; i < products.length; i++) {
    $ul.insertAdjacentHTML("afterbegin", createProduct(products[i]));
  }
  return $section.outerHTML;
};

export default createProducts;
