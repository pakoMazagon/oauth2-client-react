import { useEffect, useState } from "react"
import { TokenService } from "../services/tokenService";
import { getAdmin, getUser } from "../services/resourceService";
import { useCamarero } from "../contextos/contextoCamarero";

const Home = () => {
  const {nombreCamarero,setNombreCamarero} = useCamarero();

  useEffect(() => {
    
    console.log('useEffectHOME')
    const fetchData = async () => {
      if (TokenService.isLogged()) {
        if (TokenService.isAdmin()) {
          const admin = await getAdmin(); // Espera la respuesta          
          setNombreCamarero(JSON.parse(admin).message);
          return;
        }
        const user = await getUser(); // Espera la respuesta
        setNombreCamarero(JSON.parse(user).message);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>Bienvenido!!! <span><b>{nombreCamarero}</b></span></div>
  )
}

export default Home