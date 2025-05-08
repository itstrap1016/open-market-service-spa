export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Strict`;
};

export const logout = () => {
  deleteCookie("refreshToken");
  deleteCookie("loginType");
  deleteCookie("userName");
};

export const getSellerName = () => {
  const refreshToken = getCookie("refreshToken");
  const loginType = getCookie("loginType");
  const userName = getCookie("userName");

  if (refreshToken && loginType === "SELLER") {
    return userName;
  } else {
    return false;
  }
};
