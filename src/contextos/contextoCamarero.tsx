import { createContext, useContext, useEffect, useState } from "react";

export const CamareroContext = createContext({
    nombreCamarero: '',
    setNombreCamarero: () => {
        
    }
});

// Hook personalizado para acceder al contexto fácilmente
export const useCamarero = () => useContext(CamareroContext);

// Proveedor del contexto
export const CamareroProvider = ({ children }) => {
  const [nombreCamarero, setNombreCamareroState] = useState("");

  // Función para manejar el estado y el almacenamiento en localStorage
  const setNombreCamarero = (nombre:string) => {
      setNombreCamareroState(nombre); // Actualiza el estado
      localStorage.setItem("nombreCamarero", nombre); // Guarda en localStorage
  };

  // Recuperar el valor del localStorage al montar el componente
  useEffect(() => {
    const storedNombre = localStorage.getItem("nombreCamarero");
    if (storedNombre) {
        setNombreCamareroState(storedNombre); // Inicializa el estado con el valor guardado
    }
  }, []);
  
    return (
      <CamareroContext.Provider value={{ nombreCamarero, setNombreCamarero }}>
        {children}
      </CamareroContext.Provider>
    );
  };