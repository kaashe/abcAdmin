import axios from "axios";
let refreshTokenInterval;
const checkAuth = async () => {
  const TOKEN = localStorage.getItem("access_token");
  const REFRESH_TOKEN = localStorage.getItem("refresh_token");
  const TokenExpiration = localStorage.getItem("access_token_expires_at");
  const BASE_URL = window.location.origin;
  const PUBLIC_ROUTE_PATTERNS = [
    `${BASE_URL}/login`,
    new RegExp(`${BASE_URL}/email-verify/.+`) // Regex to match dynamic segment
  ];
  const isPublicPage = PUBLIC_ROUTE_PATTERNS.some(pattern => {
    if (pattern instanceof RegExp) {
      return pattern.test(window.location.href);
    } else {
      return window.location.href === pattern;
    }
  });
  if (!TOKEN && !isPublicPage) {
    window.location.href = "/login";
    clearInterval(refreshTokenInterval);
    return;
  } else {
    let expiryTimeInterval;
    if (TokenExpiration) {
      const expiryTimeString = JSON.parse(TokenExpiration);
      const expiryDate = new Date(expiryTimeString);
      const currentDate = new Date();
      const differenceInMilliseconds = expiryDate - currentDate;
      expiryTimeInterval = differenceInMilliseconds - 60000;
    } else {
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
    axios.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response && error.response.data === "Token is expired") {
          window.location.href = "/login";
          clearInterval(refreshTokenInterval);
        }
        return Promise.reject(error);
      }
    );
    if (refreshTokenInterval) clearInterval(refreshTokenInterval);
    refreshTokenInterval = setInterval(async () => {
      try {
        if (REFRESH_TOKEN) {
          console.log("going to refresh token...");
          const response = await axios.post(
            "http://15.185.167.66/v1//admin-auth/refresh-tokens",
            {
              refreshToken: REFRESH_TOKEN,
            }
          );
          const newToken = response?.data?.access?.token;
          // Update access token
          localStorage.setItem("access_token", newToken);
          // Update the expiry time
          const newTokenExpiration = response.data?.access?.expires;
          localStorage.setItem(
            "access_token_expires_at",
            JSON.stringify(newTokenExpiration)
          );
          const newRefreshToken = response.data?.refresh?.token;
          // Update refresh token
          localStorage.setItem("refresh_token", newRefreshToken);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.clear();

        window.location.href = "/login";
        clearInterval(refreshTokenInterval);
      }
    }, expiryTimeInterval);
  }
  return TOKEN;
};
export default checkAuth;
