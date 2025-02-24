import React from 'react'
import { ListGroup } from 'react-bootstrap'

const InputProducto = ({productos, changeProductosBusqueda, onProductoSeleccionado}) => {

    const actualizarProductosSeleccionadosTrasClick = (producto) => {
        console.log("actualizarProductosSeleccionables tras click");
        onProductoSeleccionado(producto.code, producto);
        changeProductosBusqueda([]);
        // actualizarBusqueda("");
      }

  return (
    <>
      <ListGroup defaultActiveKey="0">
        {productos.map(producto => {
          return (
            <ListGroup.Item>
              <div className="divProducto" onClick={() => actualizarProductosSeleccionadosTrasClick(producto)}>
                <p>{producto.nombre}</p>
              </div>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </>
  )
}

export default InputProducto