import { Navigate, useNavigate, useParams } from "react-router-dom"
import dataMesas from "../datos/dataSalones.js"
import FamiliaProductos from "../../productos/paginas/FamiliaProductos.js";
import dataProductos from "../../productos/datos/dataProductos.js"
import '../../productos/css/productos.css'

const Libreta = () => {
    const { sector, nombreTradicional} = useParams();    
    const mesaEncontrada = dataMesas.find(dato => dato.sector===sector && dato.nombreTradicional===nombreTradicional);
    
    const navegacion = useNavigate();
    const volver=()=>{
        navegacion(-1);
    }
    if(!mesaEncontrada){
        return <Navigate to={`/${sector}`}/>
    }

    const familias = [...new Set(dataProductos.map(p => p.familia))];
    const productosEnFamilia = dataProductos.filter(p => p.familia === 'bebidas')

  return (
    <div id="layoutLibreta">
      <div id="libreta">
        <h1>{sector}-Mesa: {nombreTradicional} ({mesaEncontrada.nombreActual})</h1>
        <button onClick={volver}>Volver</button>
      </div>
      <div id ="familiaProductos">
        <FamiliaProductos familias={familias} productos={dataProductos} productosEnFamilia={productosEnFamilia}></FamiliaProductos>
      </div>
    </div>
  )
}

export default Libreta