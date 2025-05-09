import { getProducts, getProductsBySeller } from "../api/productApi.js";
import { getSellerName } from "../services/auth.js";

const createProductHTML = (data) => `
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

const appendProductsToList = ($ul, products) => {
  products.forEach((product) => {
    $ul.insertAdjacentHTML("beforeend", createProductHTML(product));
  });
};

const createProducts = async () => {
  const sellerName = getSellerName();
  const $section = document.createElement("section");
  const $h2 = document.createElement("h2");
  const $ul = document.createElement("ul");

  $h2.textContent = "제품 리스트";
  $h2.classList.add("sr-only");
  $ul.classList.add("products-list");
  $section.classList.add("products-section");

  $section.append($h2);
  $section.append($ul);

  try {
    const [allProductsData, sellerProductsData] = await Promise.all([
      getProducts(),
      sellerName
        ? getProductsBySeller(sellerName)
        : Promise.resolve({ results: [] }),
    ]);

    const allProducts = allProductsData.results;
    const sellerProducts = sellerProductsData.results;

    appendProductsToList($ul, allProducts);
    appendProductsToList($ul, sellerProducts);
  } catch (error) {
    console.error("제품 데이터를 가져오는 중 에러 발생:", error);
  }

  return $section.outerHTML;
};

export default createProducts;
