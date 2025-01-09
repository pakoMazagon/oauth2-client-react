import { createContext, useContext, useEffect, useState } from "react";
import { TokenService } from "../services/tokenService";

type Mesa = {
    id: string; // UUID en string
    numero: number;
    sector: string;
    nombreTradicional: string;
    nombreActual: string;
    ocupada: boolean;
    camarero: string | null;
    cantidad: number;
    productos: any[]; // Ajusta según la estructura de productos
    lastUpdatedAt: string; // ISO Date string
    version: number;
  };

type MesasContextType = {
    mesas: Mesa[];
    isLoggedIn: boolean;
    fetchMesas: () => void;
    updateMesa: (mesaId: string, updatedMesa: Mesa) => void;
};
  

// Creamos el contexto
// const MesasContext = createContext({
//     mesas: [],  
//     isLoggedIn: false,
// });
const MesasContext = createContext<MesasContextType | undefined>(undefined);

export function MesasContextProvider({children}: { children: React.ReactNode }) {
    
    const [mesas,setMesas] = useState<Mesa[]>([]);
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

    // Actualizar una mesa específica
    const updateMesa = async (mesaId:string, updatedData:Mesa) => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`http://localhost:9001/mesas`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Error en la llamada al backend");
            }

            const updatedMesa = await response.json();

            // Actualizar el estado local de mesas
            setMesas((prevMesas) =>
                prevMesas.map((mesa) =>
                    mesa.id === mesaId ? { ...mesa, ...updatedMesa } : mesa
                )
            );

            console.log("Mesa actualizada con éxito");
        } catch (error) {
            console.error("Error al actualizar la mesa:", error);
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
    <MesasContext.Provider value={{mesas, fetchMesas, updateMesa}}>
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