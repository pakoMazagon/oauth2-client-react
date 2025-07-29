import { useEffect, useState } from "react";
import mesaBarra from "../assets/mesaBarra.png"; 
import mesaSalonBarra from "../assets/mesaSalonBarra.png"; 
import mesaSalonComedor from "../assets/mesaSalonComedor.png"; 
import mesaTerraza from "../assets/mesaTerraza.png"; 
import imgCheck from "../../assets/check.png"
import { Link, useNavigate } from "react-router-dom";
import { useCamarero } from "../../contextos/contextoCamarero";
import { useMesas } from "../../contextos/contextoMesas";
import Alert from 'react-bootstrap/Alert';
import { Spinner } from "react-bootstrap";

const DestinoMesa = ({id, mesaReferencia, nombre, numero, sector, ocupada,camarero, cantidad, products: products, lastUpdatedAt, version}) => {
    const [imagenDeMesa,setImagenDeMesa] = useState(mesaSalonBarra);
    const navigate = useNavigate(); // Hook para navegación
    const {nombreCamarero} = useCamarero();
    const { updateMesaConProductos: updateMesaConProductos, fetchMesaById } = useMesas(); // Consumimos el contexto
    const [mesaOcupadaAlert, setMesaOcupadaAlert] = useState(null);
    const [error, setError] = useState<string | null>(null);
    
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

    // Función para determinar qué spinner o imagen mostrar según el estado de los productos
  const renderEstadoSpinner = () => {
    if (!products || products.length === 0) {
        console.log('products.length === 0')
      return;
    }
    if (products.some(p => p.estado === "POR_PEDIR")) {
      return <Spinner animation="grow" variant="danger" size="sm" />;
    } else if (products.some(p => p.estado === "PEDIDO_A_COCINA")) {
      return <Spinner animation="border" variant="warning" size="sm" />;
    } else {
      return <img style={{width: '30px'}} alt="Servido" src={imgCheck} />;
    }
  };
    
    const handleLinkClickInMesa = async (e) => {
        console.log("Aqui entra en handleLinkClickInMesa. Ocupada:"+ocupada+ ", camarero:"+camarero)
        e.preventDefault(); // Evitar la navegación automática del Link

        try {
            if(ocupada && camarero !== nombreCamarero){
                setMesaOcupadaAlert("La mesa está ocupada por otro camarero");
                <Alert key={variant} variant={variant}>
                    This is a {variant} alert—check it out!
                </Alert>
                return;
            }
            else if(!ocupada){
                // creamos la mesa de 0 ya que no está ocupada
                console.log("ENTRA DONDE DEBE");
                const updatedMesa = {
                    id,
                    mesaReferencia,
                    nombre,
                    numero,
                    sector,
                    ocupada: true,
                    cantidad,
                    camarero: nombreCamarero,
                    productos: products,
                    lastUpdatedAt,
                    version,
                };

                await updateMesaConProductos(mesaReferencia, updatedMesa); // Actualizamos la mesa
            } 
            else{
                // significa que la mesa ya esta ocupada y por tanto podemos ir a ella por id de mesaServida
                await fetchMesaById(id); //obtenemos mesa
            }        
            // Navegar a la ruta después de la llamada
            navigate(`/mesas/${sector}/${numero}`);
        } catch (error) {
            console.error('Error en la llamada al backend:', error);
            setError(`Error llamada al backend: ${error}`);            
        }
    };
  return (    
    <>        
        <div className="destinoMesa" style={{
                            backgroundColor: ocupada ? '#f0f8ff' : '#ffffff' // '#f0f8ff' es un azul muy claro
                        }}>
            <div><img src={imagenDeMesa} alt="Mesa Salon comedor" style={{ width: '100px', height: '100px' }}/></div>
            <div className="nombre"><span>{nombre} </span></div>            
            <div className="camarero">{camarero}
                {camarero != ''?
                    <div className="estadoMesa">
                        {renderEstadoSpinner()}
                    </div>
                    :<div className="libre"></div>
                }
            </div>
            <a href={`/mesas/${sector}/${numero}`} onClick={handleLinkClickInMesa}>Entrar</a>
            {/* <Link to={`/mesas/${sector}/${nombre}`}>Entrar</Link>  */}
            {/* Mostrar alerta si existe un mensaje */}
            {mesaOcupadaAlert && (
                    <Alert variant="warning" onClose={() => setMesaOcupadaAlert(null)} dismissible>
                        {mesaOcupadaAlert}
                    </Alert>
            )}
            {error && (
                    <Alert key="danger" variant="danger" onClose={() => setError(null)} dismissible>
                        {error}
                    </Alert>
                )}
        </div>        
    </>
  )
}

export default DestinoMesa