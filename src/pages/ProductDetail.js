import Header, { setHeaderEvent } from "../components/Header";
import Footer from "../components/Footer";
import Product from "../components/Product";

const ProductDetail = async (id) => {
  const html = `${Header()}
  ${await Product(id)}
  ${Footer()}`;

  const observer = new MutationObserver(() => {
    setHeaderEvent();
    observer.disconnect(); // 초기화 후 관찰 중지
  });
  observer.observe(document.getElementById("app"), { childList: true });

  return html;
};

export default ProductDetail;
