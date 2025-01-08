import DestinoMesa from '../paginas/DestinoMesa'
// import dataSalones from './dataSalones'
import {useMesas} from "../../contextos/contextoMesas.js"

const CrearListadoMesas = ({sector}:string) => {
  const dataSalones = useMesas();
    const listado = dataSalones.filter(destino => destino.sector===sector)
    console.log(`el listado es:${listado}`)
  return (
    <>
        <section className='listaMesas'>
            {listado.map(mesa => 
                (<DestinoMesa key={mesa.nombreTradicional}{...mesa}/>)
            )}
        </section>
    </>
  )
}

export default CrearListadoMesas