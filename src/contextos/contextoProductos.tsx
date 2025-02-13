import { createContext, useContext, useEffect, useState } from "react";
import { TokenService } from "../services/tokenService";
import { ProductoBBDD } from "../productos/dominio/ProductoTypes";

  

// Creamos el contexto
const ProductosContext = createContext<ProductoBBDD[]>(
    []
    //isLoggedIn: false,
);

const {VITE_BACK_ROOT} = import.meta.env;

export function ProductosContextProvider({children}) {
    
    const [productos,setProductos] = useState<ProductoBBDD[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(TokenService.isLogged());

    // Obtención de datos desde el endpoint
    const fetchProductos = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${VITE_BACK_ROOT}/products`, {
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
        const token = localStorage.getItem("access_token");
        if (token) {
            console.log("DENTRO DE useEfectContextoMESAS"+isLoggedIn)
            fetchProductos();
            //debido a que el contexto se inicializa con la aplicacion pero no esta logado en ese
            // momento hacemos el subscriptor de abajo, para que llame cuando lo este...
            // PERO debemos de poner esto tambien para que al hacer f5 vuelva a llamar
        }
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
export const useProductos = (): ProductoBBDD[] => {
    const context = useContext(ProductosContext);
    if (!context) {
        throw new Error('useProductos debe usarse dentro de un ProductosProvider');
    }
    return context;
};