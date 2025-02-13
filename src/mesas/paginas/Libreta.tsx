import { Navigate, useNavigate, useParams } from "react-router-dom"
import {useMesas} from "../../contextos/contextoMesas.js"
import FamiliaProductos from "../../productos/paginas/FamiliaProductos.js";
import { useProductos } from '../../contextos/contextoProductos.js';
import '../../productos/css/productos.css'
import { useEffect, useState } from "react";
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
import { ProductoBBDD, ProductoInMesa, EstadoProductoEnum } from "../../productos/dominio/ProductoTypes";
import CalculatorModal from "./componentes/CalculatorModal.js";


const Libreta = () => {    
    const dataProductos: ProductoBBDD[] = useProductos();
    const {mesas, updateMesa} = useMesas();
    // console.log('dataProductos:', dataProductos);
    const { sector, numero} = useParams();    
    const mesaEncontrada = mesas.find(dato => dato.sector===sector && dato.numero==numero);

    const formatDateToISO = (date) => {
      if (!date) return null; // Manejar fechas nulas
        const fecha = new Date(date);
        const tzOffset = -fecha.getTimezoneOffset(); // Diferencia en minutos (ej: -60 para UTC+1)
        const tzHours = Math.floor(tzOffset / 60);
        const tzMinutes = tzOffset % 60;
        const tzFormatted = (tzHours >= 0 ? "+" : "-") + 
                            String(Math.abs(tzHours)).padStart(2, "0") + ":" + 
                            String(Math.abs(tzMinutes)).padStart(2, "0");

        const localISOTime = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000)
                            .toISOString().slice(0, -1); // Quitamos la "Z"

        return `${localISOTime}${tzFormatted}`;
    };
    
    const navegacion = useNavigate();
    const volver=()=>{
        navegacion(-1);
    }
    if(!mesaEncontrada){
        return <Navigate to={`/${sector}`}/>
    }

    useEffect(() => {
      console.log('useEffect de Libreta')
      setProductosSeleccionados(mesaEncontrada.products || []);
    }, [mesas]); // Se ejecuta cuando cambian las mesas en el contexto
  
    
    const familias = [...new Set(dataProductos.map(p => p.familia))];
    const productosEnFamilia = dataProductos.filter(p => p.familia === 'bebidas')

    const [productosSeleccionados, setProductosSeleccionados] = useState<ProductoInMesa[]>(mesaEncontrada.products || []);
    const [showCalculator, setShowCalculator] = useState<boolean>(false);
    const [productoParaModificar, setProductoParaModificar] = useState<ProductoInMesa | null>(null);
    
    
    const agregarProducto = async (code:string, producto?:ProductoBBDD, signo?:string, cantidad:number=1, precio?:number) => {   
      console.log(`signo es ${signo} y la cantidad es ${cantidad}`)   
      setProductosSeleccionados((prevProductos) => {
        const cantidadASumar = '-'==signo? -cantidad:cantidad;
        console.log(`cantidad  ${cantidad} y a sumar ${cantidadASumar}`)   
        let nuevosProductos = prevProductos
          .map((p) =>
            p.code === code
              ? { ...p, unidades: p.unidades + cantidadASumar, fechaHoraCreacion: formatDateToISO(p.fechaHoraCreacion), ...(precio !== undefined ? { precio } : {}) }
              : { ...p, fechaHoraCreacion: formatDateToISO(p.fechaHoraCreacion) }
          )
          .filter((p) => p.unidades > 0); // Elimina productos con cantidad 0

        if (!prevProductos.some(p => p.code === code) && producto) {
          // Si el producto no existe y se agrega por primera vez
          const nuevoProducto: ProductoInMesa = {
            id: producto.id,
            mesaReferencia: mesaEncontrada.id,
            productoReferencia: producto.id,
            unidades: 1,
            precio: producto.precio1,
            nombre: producto.nombre.toString(), 
            code: producto.code,
            estado: producto.cocina ? EstadoProductoEnum.POR_PEDIR : EstadoProductoEnum.BARRA,
            version: 1,
          };
          nuevosProductos = [...nuevosProductos, nuevoProducto];
        }
        // Calculamos la nueva mesa aquí, dentro del mismo `setProductosSeleccionados`
        const nuevaMesa = { 
          ...mesaEncontrada, 
          products: nuevosProductos,
          cantidad: parseFloat(nuevosProductos.reduce((total, nuevoProducto) => total + (nuevoProducto.unidades * nuevoProducto.precio), 0).toFixed(2)),
        };
        // Llamamos a updateMesa con la nueva lista de productos
        updateMesa(mesaEncontrada.mesaReferencia, nuevaMesa);        
        //console.log(`DESPUES mesaEncontrada.products es ${JSON.stringify(nuevaMesa)}`);        
        return nuevosProductos;
      })
      
    };

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

     // Función para abrir el modal de la calculadora
    const modificarProducto = (producto: ProductoInMesa) => {
      setProductoParaModificar(producto);
      setShowCalculator(true);
    };

    // Callback que se invoca al aplicar un valor en la calculadora
    const handleApplyCalculator = (valor: number, precio: Boolean) => {
      if (!productoParaModificar) return;
      // Llamamos a agregarProducto para sumar el valor ingresado
      if(!precio){
        // si no es precio significa que es cantidad y a la cantidad le quitamos uno porque es lo que sumará
        const valorAsumar = valor == 0?0: valor-1;
        agregarProducto(productoParaModificar.code, undefined, "+", valorAsumar);
      }      
      else{
        //significa que es precio, por tanto aplicar precio
        agregarProducto(productoParaModificar.code, undefined, "+", 0, valor);
      }
      // Cerramos el modal y limpiamos el producto seleccionado
      setShowCalculator(false);
      setProductoParaModificar(null);
    };

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
          <h6>Mesa: {numero} ({mesaEncontrada.nombre}) <span>{mesaEncontrada.cantidad.toFixed(2)}</span><Image src={imgNota} alt="Borrar" rounded/></h6>
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
                    <tr key={index}>
                      <td className="accionesProducto">
                        <Image className="Bar-borrar" alt='Borrar' src={imgEliminar} onClick={() => agregarProducto(producto.code, undefined, '-', producto.unidades)} />
                        <img className="Bar-nota" alt='Modificar' src={imgNota} onClick={() => modificarProducto(producto)} />
                      </td>
                      <td className='ColumTabla'>
                        {/* {(producto.amount > 1) ? <img className="Bar-resta" alt='Restar' src={imgResta} onClick={() => actualizarProductosSeleccionados(producto, "resta")} /> : <span> </span>} */}
                        {<img className="Bar-resta" alt='Restar' src={imgResta} onClick={() => agregarProducto(producto.code, undefined, "-",1)} />}
                        <span className='CantidadTabla'>{producto.unidades}</span>
                        <img className="Bar-suma" alt='Sumar' src={imgSuma} onClick={() => agregarProducto(producto.code, undefined, "+",1)} />
                      </td>
                      <td>
                        {(producto.estado === "POR_PEDIR") ?
                          <Spinner animation="grow" variant="danger" size="sm" onClick={() => handleShowState(prod)} />
                          :
                          (producto.estado === "PEDIDO_A_COCINA") ?
                            <Spinner animation="border" variant="warning" size="sm" onClick={() => handleShowState(prod)} />
                            :
                            <img className="Bar-suma" alt='Servido' src={imgCheck} onClick={() => handleShowState(prod)} />
                        }
                        {/* {modalState} */}
                      </td>
                      <td >{producto.nombre}</td>
                      <td >
                        {/* <div className="separar"> */}
                          <span className='CantidadTabla'>{formatter.format(producto.precio)}</span>
                      </td>
                      <td>{formatter.format(producto.unidades * producto.precio)}</td>
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
      {/* Modal de calculadora */}
      {showCalculator && productoParaModificar && (
        <CalculatorModal
          show={showCalculator}
          onHide={() => setShowCalculator(false)}
          onApply={handleApplyCalculator}
          initialValue={0}
          title={`Modificar: ${productoParaModificar.nombre}`}
        />
      )}
    </div>
  )
}

export default Libreta