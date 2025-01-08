import { createContext, useContext, useEffect, useState } from "react";
import { TokenService } from "../services/tokenService";

// Creamos el contexto
const MesasContext = createContext({
    mesas: [],  
    isLoggedIn: false,
});

export function MesasContextProvider({children}) {
    
    const [mesas,setMesas] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(TokenService.isLogged());

    // Obtención de datos desde el endpoint
    const fetchMesas = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:9001/mesas', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Autenticación con el token                    
                },
            });

            if (!response.ok) {
                console.error('Error de respuesta:', response);
                throw new Error('Error en la respuesta de la API');                
            }

            const data = await response.json();
            setMesas(data); // Guardamos las mesas
        } catch (error) {
            console.error(`ERROR in call MESAS ${error}`)
        } finally {
            console.log("call MESAS ended")
        }
    };

    useEffect(() => {
        // Suscribirse al evento cuando se establecen los tokens
        const handleTokenSet = () => {
          setIsLoggedIn(true);
          fetchMesas();
        };
    
        TokenService.onTokenSet(handleTokenSet);
    
        // Limpieza al desmontar el componente
        return () => {
          TokenService.removeTokenListener(handleTokenSet);
        };
      }, []);

  return (
    <MesasContext.Provider value={mesas}>
        {children}
    </MesasContext.Provider>
  )
}

// Hook personalizado para acceder a los mesas
export const useMesas = () => {
    const context = useContext(MesasContext);
    if (!context) {
        throw new Error('useMesas debe usarse dentro de un MesasProvider');
    }
    return context;
};