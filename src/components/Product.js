import { getProductById } from "../api/productApi";
import { counter } from "../services/counter";
import { getCookie, getSellerName } from "../services/auth";
import { getElement } from "../utils/utils";
import { COOKIE_KEYS } from "../constants/constants";

let stock;
let price;

const Product = async (id) => {
  const product = await getProductById(id);
  stock = product.stock;
  price = product.price;

  return `
    <section class="product-detail">
      <h2 class="sr-only">상품 상세 페이지</h2>
      <div class="img-info">
        <div class="img-wrapper">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="info">
          <p class="store-name">${product.seller.store_name}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="price">
            <span class="number">${product.price.toLocaleString()}</span>
            <span class="txt">원</span>
          </p>
          <div class="counter-wrapper">
            <p>택배배송 / 무료배송</p>
            <div class="counter">
              <button class="minus">
                <div class="img"></div>
              </button>
              <span class="number">1</span>
              <button class="plus">
                <div class="img-01"></div>
                <div class="img-02"></div>
              </button>
            </div>
          </div>
          <div class="total-price-wrapper">
            <p>총 상품 금액</p>
            <div class="total-price">
              <p class="total-amount">총 수량 <span>1</span>개</p>
              <p class="total-price">
                <span class="price">${product.price.toLocaleString()}</span>
                <span class="txt">원</span>
              </p>
            </div>
          </div>
          <div class="btns">
            <button class="primary-btn buy-btn">바로 구매</button>
            <button class="shopping-cart-btn">장바구니</button>
          </div>
        </div>
      </div>
      <ul class="btns-list">
        <li><button class="active">버튼</button></li>
        <li><button>리뷰</button></li>
        <li><button>Q&A</button></li>
        <li><button>반품/교환정보</button></li>
      </ul>
    </section>
  `;
};

export const setProductEvent = () => {
  const $minusBtn = getElement(".counter .minus");
  const $plusBtn = getElement(".counter .plus");
  const $buyBtn = getElement(".product-detail .buy-btn");
  const $cartBtn = getElement(".product-detail .shopping-cart-btn");
  const $modal = getElement(".login-modal");
  const refreshToken = getCookie(COOKIE_KEYS.REFRESH_TOKEN);
  const sellerName = getSellerName();

  // 판매자일 경우 버튼 비활성화
  if (sellerName) {
    [$buyBtn, $cartBtn, $minusBtn, $plusBtn].forEach((btn) => {
      btn.disabled = true;
    });
  }

  // 로그인 상태 확인 후 모달 표시
  const showLoginModalIfNotAuthenticated = () => {
    if (!refreshToken) {
      $modal.classList.add("on");
    }
  };

  // 이벤트 리스너 등록
  $buyBtn.addEventListener("click", showLoginModalIfNotAuthenticated);
  $cartBtn.addEventListener("click", showLoginModalIfNotAuthenticated);

  $minusBtn.addEventListener("click", () => {
    counter("-", price);
  });

  $plusBtn.addEventListener("click", () => {
    counter("+", price, stock);
  });
};

export default Product;
