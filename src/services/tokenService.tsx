const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

export const TokenService = {
  setTokens: (accessToken:string, refreshToken:any) => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.removeItem(REFRESH_TOKEN);
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

  isLogged: (): boolean =>{
    const localStorLogger = localStorage.getItem(ACCESS_TOKEN);
    console.log(`localStorLogged isLogged:{$}`,localStorLogger)
    return localStorLogger != null;
  },

  isAdmin: (): boolean =>{
    if(localStorage.getItem(ACCESS_TOKEN) == null){
      return false;
    }
    
    const token = localStorage.getItem(ACCESS_TOKEN);
    const payload = token!.split(".")[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    //este valor roles y ROLE_ADMIN lo sacamos del bean del authServer
    if( roles.indexOf('ROLE_ADMIN') <0){       
      return false;
    }
    return true;
  }
};
