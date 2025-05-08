import { URL } from "./common.js";

export const getProducts = async () => {
  try {
    const response = await fetch(`${URL}products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // JSON 데이터를 JavaScript 객체로 변환
    return data; // 변환된 데이터를 반환
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${URL}products/${productId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // JSON 데이터를 JavaScript 객체로 변환
    return data; // 변환된 데이터를 반환
  } catch (error) {
    console.error(`Failed to fetch product with ID ${productId}:`, error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};

export const getProductsBySeller = async (sellerName) => {
  try {
    const response = await fetch(`${URL}${sellerName}/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // JSON 데이터를 JavaScript 객체로 변환
    return data; // 변환된 데이터를 반환
  } catch (error) {
    console.error(`Failed to fetch products for seller ${sellerName}:`, error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};
