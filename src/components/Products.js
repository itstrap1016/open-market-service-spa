import { getProducts } from "../api/productApi.js";

const createProduct = (data) => {
  return `
    <li>
      <img src="${data.image}" alt="${data.name}"/>
      <p>${data.seller.store_name}</p>
      <h3>${data.name}</h3>
      <p><span>${data.price.toLocaleString()}</span><span>원</span></p>
    </li>
  `;
};

const createProducts = async () => {
  const data = await getProducts();
  const products = data.results;
  const ul = document.createElement("ul");
  for (let i = 0; i < products.length; i++) {
    ul.innerHTML += createProduct(products[i]);
  }
  return ul.outerHTML;
};

export default createProducts;
