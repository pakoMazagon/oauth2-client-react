import { createContext, useContext, useState } from "react";

export const CamareroContext = createContext({
    nombreCamarero: '',
    setNombreCamarero: () => {
        
    }
});

// Hook personalizado para acceder al contexto fácilmente
export const useCamarero = () => useContext(CamareroContext);

// Proveedor del contexto
export const CamareroProvider = ({ children }) => {
    const [nombreCamarero, setNombreCamarero] = useState("");
  
    return (
      <CamareroContext.Provider value={{ nombreCamarero, setNombreCamarero }}>
        {children}
      </CamareroContext.Provider>
    );
  };