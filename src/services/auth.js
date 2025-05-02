export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const checkLoginStatus = async () => {
  const accessToken = getCookie("access");
  const refreshToken = getCookie("refresh");

  if (accessToken) {
    // access 토큰이 유효하면 로그인 상태 유지
    console.log("로그인 상태: access 토큰 유효");
    return true;
  } else if (refreshToken) {
    // access 토큰이 만료되었으므로 refresh 토큰으로 갱신
    console.log("access 토큰 만료, refresh 토큰으로 갱신 시도");
    const newAccessToken = await refreshAccessToken(refreshToken);
    if (newAccessToken) {
      console.log("새로운 access 토큰 발급 성공");
      return true;
    }
  }

  // 로그인되지 않은 상태
  console.log("로그인되지 않은 상태");
  return false;
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await fetch("/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("토큰 갱신 실패");
    }

    const data = await response.json();
    document.cookie = `access=${data.access}; path=/; max-age=300; Secure; HttpOnly; SameSite=Strict`;
    return data.access;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    return null;
  }
};
