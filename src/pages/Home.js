import Header, { setHeaderEvent } from "../components/Header.js";
import SwiperComponent, { setSwiper } from "../components/SwiperComponent.js";
import createProducts from "../components/Products.js";
import Footer from "../components/Footer.js";
import Modal from "../components/Modal.js";

const Home = async () => {
  const Products = await createProducts();
  const homeHtml = `
  ${Header()}
  ${SwiperComponent()}
  ${Products}
  ${Footer()}
  ${Modal()}
  `;
  const observer = new MutationObserver(() => {
    setHeaderEvent();
    setSwiper();
    observer.disconnect(); // 초기화 후 관찰 중지
  });
  observer.observe(document.getElementById("app"), { childList: true });
  return homeHtml;
};

export default Home;
