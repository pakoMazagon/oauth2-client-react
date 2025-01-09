import DestinoMesa from '../paginas/DestinoMesa'
import {useMesas} from "../../contextos/contextoMesas.js"
import { useCamarero } from "../../contextos/contextoCamarero.js";

const CrearListadoMesas = ({sector}:string) => {
  const {mesas} = useMesas();
    const listado = mesas.filter(destino => destino.sector===sector)
    console.log(`el listado es:${listado}`)
  return (
    <>
        <section className='listaMesas'>
            {listado.map(mesa => 
                (<DestinoMesa key={mesa.id}{...mesa}/>)
            )}
        </section>
    </>
  )
}

export default CrearListadoMesas