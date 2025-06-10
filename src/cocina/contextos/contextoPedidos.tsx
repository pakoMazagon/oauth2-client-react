import { Client } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { ProductoInMesa } from "../../productos/dominio/ProductoTypes";

const {VITE_BACK_ROOT} = import.meta.env;

type Pedido = {
    sector: string;
    numeroMesa: number;
    nombreMesa: string;
    camarero: string; 
    product: ProductoInMesa; // Ajusta según la estructura de productos
  };
  type PedidosContextType = {
    pedidos: Pedido[];
    isLoggedIn: boolean;
    fetchPedidos: () => void;    
};

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

export const PedidosProvider = ({ children }: { children: React.ReactNode }) => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            console.warn("Token no disponible, no se puede conectar a WebSocket");
            return; // Salir si no hay token
        }

        fetchPedidos();
        const client = new Client({
            webSocketFactory: () => new SockJS(`${VITE_BACK_ROOT}/wss?token=${encodeURIComponent(token)}`),
            debug: (str) => console.log(str),
            onConnect: () => {
                client.subscribe("/topic/pedidos", (message) => {
                    const pedidoActualizado = JSON.parse(message.body);
                    console.log("Pedido actualizado:", pedidoActualizado);
                    setPedidos((prev) => {
                        const idx = prev.findIndex(p => p.product.id === pedidoActualizado.product.id);
                        console.log("Pedido recibido por WebSocket:", pedidoActualizado);
                        if (idx > -1) {
                            const copy = [...prev];
                            copy[idx] = pedidoActualizado;
                            return copy;
                        }
                        return [...prev, pedidoActualizado];
                    });
                });
            },
        });
        client.activate();
        return () => client.deactivate();
    }, []);

    const fetchPedidos = async () => {
        try {
            const res = await fetch(`${VITE_BACK_ROOT}/pedidos`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            if (!res.ok) throw new Error("Error al obtener pedidos");
            const data = await res.json();
            setPedidos(data);
        } catch (error) {
            console.error("Fallo al cargar pedidos:", error);
        }
    };

    return (
        <PedidosContext.Provider value={{ pedidos, fetchPedidos }}>
            {children}
        </PedidosContext.Provider>
    );
};

export const usePedidos = () => {
    const context = useContext(PedidosContext);
    if (!context) throw new Error("Debe usarse dentro del PedidosProvider");
    return context;
};
