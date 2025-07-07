import { createContext, useContext, useEffect, useState } from "react";
import { TokenService } from "../services/tokenService";
import { Client, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ProductoInMesa } from "../productos/dominio/ProductoTypes";

const {VITE_BACK_ROOT} = import.meta.env;

type Mesa = {    
    id: string; // UUID en string
    mesaReferencia: string;
    numero: number;
    sector: string;
    nombre: string;
    ocupada: boolean;
    camarero: string | null;
    cantidad: number;
    products: ProductoInMesa[]; // Ajusta según la estructura de productos
    lastUpdatedAt: string; // ISO Date string
    version: number;
  };

type MesasContextType = {
    mesas: Mesa[];
    isLoggedIn: boolean;
    fetchMesas: () => void;
    updateMesaConProductos: (mesaReferencia: string, updatedMesa: Mesa) => void;
    updateMesaAccion: (idMesaServida: string, metodo:string, accion:string,nuevoNombre: string, metodoPago?:string) => void;
    fetchMesaById: (idMesaServida: string) => void;
};

const MesasContext = createContext<MesasContextType | undefined>(undefined);

export function MesasContextProvider({children}: { children: React.ReactNode }) {
    
    const [mesas,setMesas] = useState<Mesa[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(TokenService.isLogged());

    // Obtención de datos desde el endpoint
    const fetchMesas = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${VITE_BACK_ROOT}/mesas`, {
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
            console.log(`ESTE FETCH_MESAS: ${JSON.stringify(data)}`);
            setMesas(data); // Guardamos las mesas
        } catch (error) {
            console.error(`ERROR in call MESAS ${error}`)
        } finally {
            console.log("call MESAS ended")
        }
    };

    // Obtención de mesa
    const fetchMesaById = async (idMesaServida:string) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${VITE_BACK_ROOT}/mesas/buscar?id=${idMesaServida}`, {
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

            const mesa = await response.json();
            console.log(`esta es la mesa ${JSON.stringify(mesa)}`)
        } catch (error) {
            console.error(`ERROR in call MESAS ${error}`)
        } finally {
            console.log("call MESAS ended")
        }
    };

    const formatDateToISO = (date) => {
        if (!date) return null; // Manejar fechas nulas
        const fecha = new Date(date);
        const tzOffset = -fecha.getTimezoneOffset(); // Diferencia en minutos (ej: -60 para UTC+1)
        const tzHours = Math.floor(tzOffset / 60);
        const tzMinutes = tzOffset % 60;
        const tzFormatted = (tzHours >= 0 ? "+" : "-") + 
                            String(Math.abs(tzHours)).padStart(2, "0") + ":" + 
                            String(Math.abs(tzMinutes)).padStart(2, "0");

        const localISOTime = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000)
                            .toISOString().slice(0, -1); // Quitamos la "Z"

        return `${localISOTime}${tzFormatted}`;
      };

    const formatProductos = (productos: ProductoInMesa[]): ProductoInMesa[] => {        
        return productos.map((producto) => (
            console.log(`pasa por formatProductos, siendo la fecha ${producto.fechaHoraCreacion} y la fecha modificaca ${formatDateToISO(producto.fechaHoraCreacion)}`),
            {
            
          ...producto,
          fechaHoraPedido: formatDateToISO(producto.fechaHoraPedido),
          fechaHoraServido: formatDateToISO(producto.fechaHoraServido),
          fechaHoraCreacion: formatDateToISO(producto.fechaHoraCreacion),
        }));
      };

    // Actualizar una mesa específica (con productos)
    const updateMesaConProductos = async (mesaReferencia:string, updatedData:Mesa) => {
        const formattedData = {
            ...updatedData,
            lastUpdatedAt: formatDateToISO(updatedData.lastUpdatedAt),
            fechaInicio: formatDateToISO(updatedData.lastUpdatedAt),
            products: updatedData.products?formatProductos(updatedData.products):[],
          };
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`${VITE_BACK_ROOT}/mesas`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                throw new Error("Error en la llamada al backend");
            }

            const updatedMesa = await response.json();

            // Actualizar el estado local de mesas
            setMesas((prevMesas) =>
                prevMesas.map((mesa) =>
                    mesa.mesaReferencia === mesaReferencia ? { ...mesa, ...updatedMesa } : mesa
                )
            );

            console.log("Mesa actualizada con éxito");
        } catch (error) {
            console.error("Error al actualizar la mesa:", error);
        }
    };

    // Actualizar un atributo de una mesa específica (o bien acciones sobre ella pero sin cambio en productos)
    const updateMesaAccion = async (idMesaServida:string, metodo:string, accion:string, nuevoNombre:string, metodoPago?:string) => {        
        try {
            const token = localStorage.getItem("access_token");
            let url = `${VITE_BACK_ROOT}/mesas/${idMesaServida}`;            
            if (accion) {
                url += `/${accion}`;
            }
            let body = null;
            if (accion === "cobrar"){
                url = `${VITE_BACK_ROOT}/mesas/cobrar`;
                body = JSON.stringify({ id: idMesaServida, tipoPago: metodoPago });
            }
            else if (accion === "cambiarCamarero") {
                url = `${VITE_BACK_ROOT}/mesas/${idMesaServida}/camarero`;
                body = JSON.stringify({ camarero: nuevoNombre });
            }
            const response = await fetch(url, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                ...(nuevoNombre ? { body: JSON.stringify({ nombre: nuevoNombre }) } : {}),
                ...(body ? { body } : {}),
            });

            if (!response.ok) {
                throw new Error("Error en la llamada al backend");
            }

            // Actualizar el estado local de mesas
            setMesas((prevMesas) =>
                prevMesas.map((mesa) =>
                    mesa.id === idMesaServida ? accion === "cambiarCamarero"
                                ? { ...mesa, camarero: nuevoNombre }
                                : { ...mesa, nombre: nuevoNombre } : mesa
                )
            );

            console.log("Nombre Mesa actualizado con éxito");
        } catch (error) {
            console.error("Error al actualizar la mesa:", error);
        }
    };

    

    //conexion a websocket
useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (!token) {
      console.warn("Token no disponible, no se puede conectar a WebSocket");
      return; // Salir si no hay token
  }

    const client = new Client({
      //webSocketFactory: () => new SockJS(`${VITE_BACK_ROOT}/ws/info?t=${token}`),
      // webSocketFactory: () => new SockJS(`${VITE_BACK_ROOT}/ws?t=${encodeURIComponent(token)}`),
      // webSocketFactory: () => new SockJS(`${VITE_BACK_ROOT}/ws`),
      webSocketFactory: () => new SockJS(
        `${VITE_BACK_ROOT}/wss?token=${encodeURIComponent(token)}`, 
        {headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          }
        },
        { headers: {Authorization: `Bearer ${token}` }},
      ),
      // connectHeaders: {
      //   Authorization: `Bearer ${token}`, // Pasa el token en los headers
      // },
      debug: (str) => console.log(str),
      onConnect: () => {
        //   console.log("Conectado a servidor STOMP");

          // Suscribirse a mensajes del servidor
          client.subscribe("/topic/mesas", (message) => {
            console.log("llega evento:"+message);
              if (message.body) {
                console.log("llega evento (2):"+message.body);
                  const updatedMesa: Mesa = JSON.parse(message.body);
                  console.log("llega evento (3):"+updatedMesa);
                  setMesas((prevMesas) => {
                      const index = prevMesas.findIndex(
                          (mesa) => mesa.mesaReferencia === updatedMesa.mesaReferencia
                      );
                      if (index > -1) {
                          // Reemplazar la mesa existente
                          const newMesas = [...prevMesas];
                          newMesas[index] = updatedMesa;
                          return newMesas;
                      } else {
                          // Añadir nueva mesa (si no existía previamente)
                          return [...prevMesas, updatedMesa];
                      }
                  });
              }
          });
      },
      onDisconnect: () => {
          console.log("Desconectado de WebSocket");
      },
      onStompError: (error) => {
          console.error("Error STOMP:", error);
      },
      onWebSocketClose: () => {
          console.log("Conexión SockJS cerrada");
      },
    });

    // Iniciar conexión
    client.activate();

    // Limpieza al desmontar
    return () => {
        client.deactivate();
    };
  }, [isLoggedIn]); // Vuelve a ejecutar si cambia el estado de inicio de sesión

    // conexion como subscriptor para obtener el usuario
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            console.log("DENTRO DE useEfectContextoMESAS"+isLoggedIn)
            fetchMesas();
            //debido a que el contexto se inicializa con la aplicacion pero no esta logado en ese
            // momento hacemos el subscriptor de abajo, para que llame cuando lo este...
            // PERO debemos de poner esto tambien para que al hacer f5 vuelva a llamar
        }
        // Suscribirse al evento cuando se establecen los tokens
        const handleTokenSet = () => {
            console.log("DENTRO DE HANDLETOKENSET:")
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
    <MesasContext.Provider value={{mesas, fetchMesas, updateMesaConProductos: updateMesaConProductos,updateMesaAccion: updateMesaAccion, fetchMesaById}}>
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