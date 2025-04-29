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
  if (typeof Swiper === "undefined") {
    console.error("Swiper is not loaded. Please check the Swiper library.");
    return;
  }

  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // 페이지네이션 클릭 가능
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

export default SwiperComponet;
