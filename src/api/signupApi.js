import { URL } from "../constants/constants";

export const checkId = async (username) => {
  try {
    const response = await fetch(`${URL}accounts/validate-username/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 요청 본문이 JSON임을 명시
      },
      body: JSON.stringify({ username }), // JSON 형식으로 변환하여 전송
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json(); // JSON 데이터를 JavaScript 객체로 변환
    return data; // 변환된 데이터를 반환
  } catch (error) {
    console.error(error);
    return false; // 에러를 호출한 곳으로 전달
  }
};

export const checkBusinessNumber = async (company_registration_number) => {
  try {
    const response = await fetch(
      `${URL}accounts/seller/validate-registration-number/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 요청 본문이 JSON임을 명시
        },
        body: JSON.stringify({ company_registration_number }), // JSON 형식으로 변환하여 전송
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json(); // JSON 데이터를 JavaScript 객체로 변환
    return data; // 변환된 데이터를 반환
  } catch (error) {
    console.error("Failed to validate business number:", error);
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name, phone_number }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, errorData: data }; // 실패 시 에러 데이터를 반환
    }

    return { success: true, data }; // 성공 시 데이터를 반환
  } catch (error) {
    console.error("Failed to sign up buyer:", error);
    return {
      success: false,
      errorData: { message: "네트워크 오류가 발생했습니다." },
    };
  }
};

export const sellerSignup = async ({
  username,
  password,
  name,
  phone_number,
  company_registration_number,
  store_name,
}) => {
  try {
    const response = await fetch(`${URL}accounts/seller/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        name,
        phone_number,
        company_registration_number,
        store_name,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, errorData: data }; // 실패 시 에러 데이터를 반환
    }

    return { success: true, data }; // 성공 시 데이터를 반환
  } catch (error) {
    console.error("Failed to sign up seller:", error);
    return {
      success: false,
      errorData: { message: "네트워크 오류가 발생했습니다." },
    };
  }
};
