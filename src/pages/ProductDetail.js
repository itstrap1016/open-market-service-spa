import Header, { setHeaderEvent } from "../components/Header";
import Footer from "../components/Footer";
import Product, { setProductEvent } from "../components/Product";
import Modal, { setModalEvents } from "../components/Modal";

const ProductDetail = async (id) => {
  const html = `${Header()}
  ${await Product(id)}
  ${Footer()}
  ${Modal()}
  `;

  const observer = new MutationObserver(() => {
    setHeaderEvent();
    setProductEvent();
    setModalEvents();
    observer.disconnect(); // 초기화 후 관찰 중지
  });
  observer.observe(document.getElementById("app"), { childList: true });

  return html;
};

export default ProductDetail;
