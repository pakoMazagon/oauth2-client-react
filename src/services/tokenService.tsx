const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

export const TokenService = {
  setTokens: (accessToken:string, refreshToken:string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  },

  getAccessToken: () => {
    return localStorage.getItem(ACCESS_TOKEN);
  },

  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN);
  },

  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  },
};
