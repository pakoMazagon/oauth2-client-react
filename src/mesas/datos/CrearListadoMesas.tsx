import DestinoMesa from '../paginas/DestinoMesa'
import {useMesas} from "../../contextos/contextoMesas.js"
import { useState } from 'react';
// import '../css/estilosToggle.css'
import { Form } from "react-bootstrap";

const CrearListadoMesas = ({sector}:string) => {
  const {mesas} = useMesas();
  const [soloMias, setSoloMias] = useState(false); // 👈 Toggle
    let listado = mesas.filter(destino => destino.sector===sector)
    if (soloMias) {
      listado = listado.filter(mesa => mesa.camarero === localStorage.getItem("nombreCamarero"));
    }
    console.log(`el listado es:${JSON.stringify(listado, null, 2)}`)
  return (
    <>
        <Form className="my-3 d-flex justify-content-center align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Form.Check
              type="switch"
              id="solo-mias-switch"
              label=""
              checked={soloMias}
              onChange={() => setSoloMias(!soloMias)}
              className="fs-5 m-0"
            />
            <span className="fs-5">Solo mis mesas</span>
          </div>
        </Form>

        <section className='listaMesas'>
            {listado.map(mesa => 
                (<DestinoMesa key={mesa.mesaReferencia}{...mesa}/>)
            )}
        </section>
    </>
  )
}

export default CrearListadoMesas