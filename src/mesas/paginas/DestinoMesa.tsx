import { useEffect, useState } from "react";
import mesaBarra from "../assets/mesaBarra.png"; 
import mesaSalonBarra from "../assets/mesaSalonBarra.png"; 
import mesaSalonComedor from "../assets/mesaSalonComedor.png"; 
import mesaTerraza from "../assets/mesaTerraza.png"; 
import { Link, useNavigate } from "react-router-dom";
import { useCamarero } from "../../contextos/contextoCamarero";
import { useMesas } from "../../contextos/contextoMesas";

const DestinoMesa = ({id, nombreTradicional, numero, sector, nombreActual,ocupada,camarero, cantidad, productos, lastUpdatedAt, version}) => {
    const [imagenDeMesa,setImagenDeMesa] = useState(mesaSalonBarra);
    const navigate = useNavigate(); // Hook para navegación
    const {nombreCamarero} = useCamarero();
    const { updateMesa } = useMesas(); // Consumimos el contexto
    
    useEffect(() =>{
        if(sector === 'salonComedor'){
            setImagenDeMesa(mesaSalonComedor);
        }
        else if(sector === 'salonBarra'){
            setImagenDeMesa(mesaSalonBarra);
        }
        else if(sector === 'barra'){
            setImagenDeMesa(mesaBarra);
        }
        else if(sector === 'terraza'){
            setImagenDeMesa(mesaTerraza);
        }
    },[sector])
    
    const handleLinkClickInMesa = async (e) => {
        e.preventDefault(); // Evitar la navegación automática del Link

        try {
            if(ocupada && camarero !== nombreCamarero){
                console.log("La mesa está ocupada por otro camarero");
                return;
            }
            else if(!ocupada && (camarero == null || camarero=='')){
                const updatedMesa = {
                    id,
                    nombreTradicional,
                    numero,
                    sector,
                    nombreActual,
                    ocupada: true,
                    cantidad,
                    camarero: nombreCamarero,
                    productos,
                    lastUpdatedAt,
                    version,
                };

                await updateMesa(id, updatedMesa); // Actualizamos la mesa
            }            
            // Navegar a la ruta después de la llamada
            navigate(`/mesas/${sector}/${nombreTradicional}`);
        } catch (error) {
            console.error('Error en la llamada al backend:', error);
        }
    };
  return (    
    <>        
        <div className="destinoMesa">
            <div><img src={imagenDeMesa} alt="Mesa Salon comedor" style={{ width: '100px', height: '100px' }}/></div>
            <div className="nombreTradicional"><span>{nombreTradicional} </span> {nombreActual}</div>            
            <div className="camarero">{camarero}
                {ocupada === true?
                    <div className="ocupada"></div>:
                    <div className="libre"></div>
                }
            </div>
            <a href={`/mesas/${sector}/${nombreTradicional}`} onClick={handleLinkClickInMesa}>Entrar</a>
            {/* <Link to={`/mesas/${sector}/${nombreTradicional}`}>Entrar</Link>  */}
        </div>        
    </>
  )
}

export default DestinoMesa