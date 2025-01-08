import { Navigate, useNavigate, useParams } from "react-router-dom"
// import dataMesas from "../datos/dataSalones.js"
import {useMesas} from "../../contextos/contextoMesas.js"
import FamiliaProductos from "../../productos/paginas/FamiliaProductos.js";
// import dataProductos from "../../productos/datos/dataProductos.js"
import { useProductos } from '../../contextos/contextoProductos.js';
import '../../productos/css/productos.css'
import { useState } from "react";
import { Button, Modal, Spinner, Table, Image } from "react-bootstrap";
import imgEliminar from "../assets/eliminar.png";
import imgResta from "../../assets/resta.png"
import imgSuma from "../../assets/suma.png"
import imgCheck from "../../assets/check.png"
import imgNota from "../../assets/nota.png"
import imgImprimir from "../../assets/impresion.png"
import imgCobrar from "../../assets/billete.png"
import imgBorrar from "../../assets/borrar.png"
import imgTpv from "../../assets/tpv.png"
import imgFactura from "../../assets/factura.png"
import imgSalir from "../../assets/salir.png"

const Libreta = () => {
    const dataProductos = useProductos();
    const dataMesas = useMesas();
    console.log('dataProductos:', dataProductos);
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

    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const agregarProducto = (producto) => {
      setProductosSeleccionados((prev) => [...prev, producto]);
    };

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div id="layoutLibreta">
      <div id="libreta">
      {/* <!-- Barra de acciones --> */}
        <div id="actionBar">
          <button onClick={volver}>
            <img src={imgSalir} alt="Imprimir" />
            <div className="actionLabel">Volver</div>
          </button>
          <button onClick={() => console.log("Imprimir")}>
            <img src={imgImprimir} alt="Imprimir" />
            <div className="actionLabel">Imprimir</div>
          </button>
          <button onClick={() => console.log("Cobrar")}>
            <Image src={imgCobrar} alt="Cobrar" roundedCircle/>
            <div className="actionLabel">Cobrar</div>
          </button>
          <button onClick={() => console.log("TPV")}>
            <Image src={imgTpv} alt="TPV" roundedCircle/>
            <div className="actionLabel">TPV</div>
          </button>
          <button onClick={() => console.log("Factura")}>
            <Image src={imgFactura} alt="Factura" rounded/>
            <div className="actionLabel">Factura</div>
          </button>
          <button onClick={() => console.log("Borrar")}>            
            <Image src={imgBorrar} rounded />
            <div className="actionLabel">Borrar</div>
          </button>          
        </div>
        {/* Tabla de la libreta */}
        <div id="libretaTable">
          <h6>Mesa: {nombreTradicional} ({mesaEncontrada.nombreActual}) <Image src={imgNota} alt="Borrar" rounded/></h6>
          <Table responsive="sm" hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th >Cant</th>
                <th >Est</th>
                <th >Art</th>
                <th >Precio</th>
                <th >Total</th>
              </tr>
            </thead>
            <tbody>
              {productosSeleccionados.map((producto, index) => {
                  return (
                    <tr>
                      <td className="accionesProducto">
                        <Image className="Bar-borrar" alt='Borrar' src={imgEliminar} onClick={() => eliminarProductosSeleccionados(producto)} />
                        <img className="Bar-nota" alt='Modificar' src={imgNota} onClick={() => modificarProducto(producto)} />
                      </td>
                      <td className='ColumTabla'>
                        {/* {(producto.amount > 1) ? <img className="Bar-resta" alt='Restar' src={imgResta} onClick={() => actualizarProductosSeleccionados(producto, "resta")} /> : <span> </span>} */}
                        {<img className="Bar-resta" alt='Restar' src={imgResta} onClick={() => actualizarProductosSeleccionados(producto, "resta")} />}
                        <span className='CantidadTabla'>{producto.amount}2</span>
                        <img className="Bar-suma" alt='Sumar' src={imgSuma} onClick={() => actualizarProductosSeleccionados(producto, "suma")} />
                      </td>
                      <td>
                        {(producto.state === "POR_PEDIR") ?
                          <Spinner animation="grow" variant="danger" size="sm" onClick={() => handleShowState(prod)} />
                          :
                          (producto.state === "PEDIDO_A_COCINA") ?
                            <Spinner animation="border" variant="warning" size="sm" onClick={() => handleShowState(prod)} />
                            :
                            <img className="Bar-suma" alt='Servido' src={imgCheck} onClick={() => handleShowState(prod)} />
                        }
                        {/* {modalState} */}
                      </td>
                      <td >{producto.nombre}</td>
                      <td >
                        {/* <div className="separar"> */}
                          <span className='CantidadTabla'>{formatter.format(producto.precio1)}</span>
                          {/* <img className="Bar-nota" alt='Cambiar Precio' src={imgNota} onClick={() => handleShow(producto)} /> */}
                        {/* </div> */}
                        {/* <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Cambiar Precio</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <h3>{nuevoPrecio}</h3>
                            <div> <Button variant="dark" onClick={() => handleAddNumberToPrice('1')}>1</Button> <Button variant="dark" onClick={() => handleAddNumberToPrice('2')}>2</Button> <Button variant="dark" onClick={() => handleAddNumberToPrice('3')}>3</Button></div>
                            <div> <Button variant="dark" onClick={() => handleAddNumberToPrice('4')}>4</Button> <Button variant="dark" onClick={() => handleAddNumberToPrice('5')}>5</Button> <Button variant="dark" onClick={() => handleAddNumberToPrice('6')}>6</Button></div>
                            <div> <Button variant="dark" onClick={() => handleAddNumberToPrice('7')}>7</Button> <Button variant="dark" onClick={() => handleAddNumberToPrice('8')}>8</Button> <Button variant="dark" onClick={() => handleAddNumberToPrice('9')}>9</Button></div>
                            <div> <Button disabled={nuevoPrecio.includes(".")} variant="dark" onClick={() => handleAddNumberToPrice('.')}>.  </Button> <Button variant="dark" onClick={() => handleAddNumberToPrice('0')}>0</Button> <Button disabled={nuevoPrecio.length < 1} variant="dark" onClick={() => handleAddNumberToPrice('B')}>B</Button></div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Cerrar
                            </Button>
                            <Button variant="primary" onClick={() => handleChangePrice(prod)}>
                              Aplica nuevo precio
                            </Button>
                          </Modal.Footer>
                        </Modal> */}
                      </td>
                      <td>{formatter.format(1 * producto.precio1)}</td>
                    </tr>
                  )
                }
              )}  
            </tbody>
          </Table>        
          <button onClick={volver}>Volver</button>
        </div>        
      </div>
      <div id ="familiaProductos">
        <FamiliaProductos 
          familias={familias} productos={dataProductos} 
          productosEnFamilia={productosEnFamilia} onProductoSeleccionado={agregarProducto}>          
        </FamiliaProductos>
      </div>
    </div>
  )
}

export default Libreta