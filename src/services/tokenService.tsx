import CryptoJS from 'crypto-js';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const CODE_VERIFIER = 'code_verifier';

const { VITE_SECRET_PKCE } = import.meta.env;

type TokenListener = () => void;

const listeners: TokenListener[] = [];

export const TokenService = {
  setTokens: (accessToken:string, refreshToken:any) => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

    // Notificar a los oyentes que los tokens se han configurado
    listeners.forEach((listener) => listener());
  },

  onTokenSet: (listener: TokenListener) => {
    listeners.push(listener);
  },

  removeTokenListener: (listener: TokenListener) => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
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
  },

  setVerifier(code_verifier:string): void{
    if(localStorage.getItem(CODE_VERIFIER)){
      TokenService.deleteVerifier();
    }
    const encrypted:any = CryptoJS.AES.encrypt(code_verifier, VITE_SECRET_PKCE);
    localStorage.setItem(CODE_VERIFIER, encrypted);
  },

  getVerifier(): string{
    const encrypted:any = localStorage.getItem(CODE_VERIFIER);
    const decrypted = CryptoJS.AES.decrypt(encrypted, VITE_SECRET_PKCE).toString(CryptoJS.enc.Utf8);
    return decrypted;
  },
  

  deleteVerifier():void{
    localStorage.removeItem(CODE_VERIFIER);
  },
};
