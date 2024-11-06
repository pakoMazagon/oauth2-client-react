import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { TokenResponse, getToken } from "../services/authService";
import {TokenService} from "../services/tokenService";


const Authorized: React.FC = () => {

  const [code, setCode] = useState<string>('');
  const [token, setToken] = useState<TokenResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const codeParam = params.get('code');
    if(codeParam){
      setCode(codeParam)
    }
  }, [location]);

  useEffect(() => {
    // Llamar al servicio `getToken` si tenemos el código de autorización
    const fetchToken = async () => {
      if (code) {
        try {
          const response = await getToken(code);
          setToken(response); // Guardar el token en el estado
          TokenService.setTokens(response.access_token, response.refresh_token);
        } catch (err: any) {
          console.log(err);
          setError(err.message || 'Error fetching token'); // Manejar cualquier error
        }
      }
    };

    fetchToken();
  }, [code]);

  return (
    <>
      <p>Authorization Code: {code}</p>
      {token ? (
        <p>Access Token: {token.access_token}</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Fetching token...</p>
      )}
    </>    
  )
}

export default Authorized