export const counter = (symbol, price = 0, stock = 0) => {
  const $number = document.querySelector(".counter .number");
  let number = Number($number.textContent);
  const $totalNumber = document.querySelector(
    ".total-price .total-amount span"
  );
  const $totalPrice = document.querySelector(".total-price .price");
  if (symbol === "+") {
    if (number < stock) {
      number += 1;
    } else {
      alert("재고가 더 이상 없습니다");
    }
  }
  if (symbol === "-") {
    if (number > 1) {
      number -= 1;
    }
  }
  $number.textContent = number;
  $totalNumber.textContent = number;
  $totalPrice.textContent = (number * price).toLocaleString();
};
