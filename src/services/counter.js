import { getElement } from "../utils/utils";

export const counter = (symbol, price = 0, stock = 0) => {
  const $number = getElement(".counter .number");
  let number = Number($number.textContent);
  const $totalNumber = getElement(".total-price .total-amount span");
  const $totalPrice = getElement(".total-price .price");
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
