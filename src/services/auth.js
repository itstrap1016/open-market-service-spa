import { COOKIE_KEYS } from "../constants/constants";

const { REFRESH_TOKEN, LOGIN_TYPE, USER_NAME } = COOKIE_KEYS;

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
  deleteCookie(REFRESH_TOKEN);
  deleteCookie(LOGIN_TYPE);
  deleteCookie(USER_NAME);
};

export const getSellerName = () => {
  const refreshToken = getCookie(REFRESH_TOKEN);
  const loginType = getCookie(LOGIN_TYPE);
  const userName = getCookie(USER_NAME);

  if (refreshToken && loginType === "SELLER") {
    return userName;
  } else {
    return false;
  }
};
