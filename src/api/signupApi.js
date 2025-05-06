import { URL } from "./common";

export const validateUsername = async (username) => {
  try {
    const response = await fetch(`${URL}accounts/validate-username/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 요청 본문이 JSON임을 명시
      },
      body: JSON.stringify({ username }), // JSON 형식으로 변환하여 전송
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // JSON 데이터를 JavaScript 객체로 변환
    return data; // 변환된 데이터를 반환
  } catch (error) {
    console.error(error);
    return false; // 에러를 호출한 곳으로 전달
  }
};

export const buyerSignup = async ({
  username,
  password,
  name,
  phone_number,
}) => {
  try {
    const response = await fetch(`${URL}accounts/buyer/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 요청 본문이 JSON임을 명시
      },
      body: JSON.stringify({ username, password, name, phone_number }), // JSON 형식으로 변환하여 전송
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // JSON 데이터를 JavaScript 객체로 변환
    return data; // 변환된 데이터를 반환
  } catch (error) {
    console.error(error);
    return false; // 에러를 호출한 곳으로 전달
  }
};
