import { getProductById } from "../api/productApi";

let stock;

const Product = async (id) => {
  const product = await getProductById(id);
  stock = product.stock;
  console.log(product, stock);

  return `
    <section class="product-detail">
      <h2 class="sr-only">상품 상세 페이지</h2>
      <div class="img-info">
        <div class="img-wrapper">
          <img src="${product.image}"/>
        </div>
        <div class="info">
          <p class="store-name">${product.seller["store_name"]}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="price"><span class="number">${product.price.toLocaleString()}</span><span class="txt">원<span/></p>
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
              <p class="total-price"><span class="price">${product.price.toLocaleString()}</span><span class="txt">원</span></p>
            </div>
          </div>
          <div class="btns">
            <button class="primary-btn buy-btn">바로 구매</button>
            <a href="#" class="shopping-cart-btn">장바구니</a>
          </div>
        </div>
      </div>
      <ul class="btns-list">
        <li>
          <button class="active">버튼</button>
        </li>
        <li>
          <button>리뷰</button>
        </li>
        <li>
          <button>Q&A</button>
        </li>
        <li>
          <button>반품/교환정보</button>
        </li>
      </ul>       
    </section>
  `;
};

export default Product;
