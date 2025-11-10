import { useEffect, useState } from "react"
import { TokenService } from "../services/tokenService";
import { getAdmin, getUser } from "../services/resourceService";
import { useCamarero } from "../contextos/contextoCamarero";
import LogoBar from '../assets/LogoBar.png';
import { motion } from "framer-motion";

const Home = () => {
  const {nombreCamarero,setNombreCamarero} = useCamarero();
  const [mensajeAccion, setMensajeAccion] = useState('Logate para empezar');

  useEffect(() => {
    
    console.log('useEffectHOME')
    const fetchData = async () => {
      if (TokenService.isLogged()) {
        if (TokenService.isAdmin()) {
          const admin = await getAdmin(); // Espera la respuesta          
          setNombreCamarero(JSON.parse(admin).message);
          setMensajeAccion("Selecciona una opción del menu de arriba");
          return;
        }
        const user = await getUser(); // Espera la respuesta
        setNombreCamarero(JSON.parse(user).message);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="home-tpv">
      <div className="overlay"/>
      <div className="content">
        <img src={LogoBar} alt="Logo del restaurante" className="logo" />
        <h1 className="tittle">Bienvenido <span className="nombre-camarero"><b>{nombreCamarero}</b></span></h1>        
        <p className="subtitle">
          Sistema de gestión para camareros — {mensajeAccion}
        </p>
      </div>
    </div>    
  )
}

export default Home