import { createContext, useContext, useEffect, useState } from "react";
import { TokenService } from "../services/tokenService";

// Creamos el contexto
const ProductosContext = createContext({
    productos: [],  
    isLoggedIn: false,
});

export function ProductosContextProvider({children}) {
    
    const [productos,setProductos] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(TokenService.isLogged());

    // Obtención de datos desde el endpoint
    const fetchProductos = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:9001/products', {
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
            setProductos(data); // Guardamos los productos en el estado
        } catch (error) {
            console.error(`ERROR in call PRODUCTS ${error}`)
        } finally {
            console.log("call PRODUCTS ended")
        }
    };

    useEffect(() => {
        // Suscribirse al evento cuando se establecen los tokens
        const handleTokenSet = () => {
          setIsLoggedIn(true);
          fetchProductos();
        };
    
        TokenService.onTokenSet(handleTokenSet);
    
        // Limpieza al desmontar el componente
        return () => {
          TokenService.removeTokenListener(handleTokenSet);
        };
      }, []);

  return (
    <ProductosContext.Provider value={productos}>
        {children}
    </ProductosContext.Provider>
  )
}

// Hook personalizado para acceder a los productos
export const useProductos = () => {
    const context = useContext(ProductosContext);
    if (!context) {
        throw new Error('useProductos debe usarse dentro de un ProductosProvider');
    }
    return context;
};