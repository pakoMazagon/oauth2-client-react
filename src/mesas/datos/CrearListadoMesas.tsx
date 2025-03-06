import DestinoMesa from '../paginas/DestinoMesa'
import {useMesas} from "../../contextos/contextoMesas.js"

const CrearListadoMesas = ({sector}:string) => {
  const {mesas} = useMesas();
    const listado = mesas.filter(destino => destino.sector===sector)
    console.log(`el listado es:${JSON.stringify(listado, null, 2)}`)
  return (
    <>
        <section className='listaMesas'>
            {listado.map(mesa => 
                (<DestinoMesa key={mesa.mesaReferencia}{...mesa}/>)
            )}
        </section>
    </>
  )
}

export default CrearListadoMesas