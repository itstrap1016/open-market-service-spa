import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getSellerName } from "../services/auth";

const SwiperComponet = () => {
  return `
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
  `;
};

export const setSwiper = () => {
  const $swiper = document.querySelector(".swiper");
  const sellerName = getSellerName();

  if (sellerName) {
    $swiper.classList.add("has-more-padding");
  }

  if (typeof Swiper === "undefined") {
    console.error("Swiper is not loaded. Please check the Swiper library.");
    return;
  }

  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 3000, // 3초마다 슬라이드
      disableOnInteraction: false, // 사용자 상호작용 후에도 자동 슬라이드 유지
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // 페이지네이션 클릭 가능
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    modules: [Navigation, Pagination],
  });

  return swiper;
};

export default SwiperComponet;
