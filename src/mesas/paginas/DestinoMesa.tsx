import { useEffect, useState } from "react";
import mesaBarra from "../assets/mesaBarra.png"; 
import mesaSalonBarra from "../assets/mesaSalonBarra.png"; 
import mesaSalonComedor from "../assets/mesaSalonComedor.png"; 
import mesaTerraza from "../assets/mesaTerraza.png"; 
import { Link, useNavigate } from "react-router-dom";
import { useCamarero } from "../../contextos/contextoCamarero";
import { useMesas } from "../../contextos/contextoMesas";
import Alert from 'react-bootstrap/Alert';

const DestinoMesa = ({id, mesaReferencia, nombre, numero, sector, ocupada,camarero, cantidad, productos, lastUpdatedAt, version}) => {
    const [imagenDeMesa,setImagenDeMesa] = useState(mesaSalonBarra);
    const navigate = useNavigate(); // Hook para navegación
    const {nombreCamarero} = useCamarero();
    const { updateMesa, fetchMesaById } = useMesas(); // Consumimos el contexto
    const [mesaOcupadaAlert, setMesaOcupadaAlert] = useState(null);
    
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
                setMesaOcupadaAlert("La mesa está ocupada por otro camarero");
                <Alert key={variant} variant={variant}>
                    This is a {variant} alert—check it out!
                </Alert>
                return;
            }
            else if(!ocupada && (camarero == null || camarero=='')){
                // creamos la mesa de 0 ya que no está ocupada
                const updatedMesa = {
                    id,
                    mesaReferencia,
                    nombre,
                    numero,
                    sector,
                    ocupada: true,
                    cantidad,
                    camarero: nombreCamarero,
                    productos,
                    lastUpdatedAt,
                    version,
                };

                await updateMesa(mesaReferencia, updatedMesa); // Actualizamos la mesa
            } 
            else{
                // significa que la mesa ya esta ocupada y por tanto podemos ir a ella por id de mesaServida
                await fetchMesaById(id); //obtenemos mesa
            }        
            // Navegar a la ruta después de la llamada
            navigate(`/mesas/${sector}/${nombre}`);
        } catch (error) {
            console.error('Error en la llamada al backend:', error);
        }
    };
  return (    
    <>        
        <div className="destinoMesa">
            <div><img src={imagenDeMesa} alt="Mesa Salon comedor" style={{ width: '100px', height: '100px' }}/></div>
            <div className="nombre"><span>{nombre} </span></div>            
            <div className="camarero">{camarero}
                {ocupada === true?
                    <div className="ocupada"></div>:
                    <div className="libre"></div>
                }
            </div>
            <a href={`/mesas/${sector}/${nombre}`} onClick={handleLinkClickInMesa}>Entrar</a>
            {/* <Link to={`/mesas/${sector}/${nombre}`}>Entrar</Link>  */}
            {/* Mostrar alerta si existe un mensaje */}
            {mesaOcupadaAlert && (
                    <Alert variant="warning" onClose={() => setMesaOcupadaAlert(null)} dismissible>
                        {mesaOcupadaAlert}
                    </Alert>
            )}
        </div>        
    </>
  )
}

export default DestinoMesa