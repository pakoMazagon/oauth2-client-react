import { useState } from "react";
import { Card, Nav, TabContainer, TabContent } from "react-bootstrap"
import '../css/productos.css'

const FamiliaProductos = ({familias, productos, productosEnFamilia, onProductoSeleccionado}) => {
    const [productosSeleccionables, setProductosSeleccionables] = useState([...productosEnFamilia]);
    const actualizarProductosSeleccionables = (family) => {
        setProductosSeleccionables(productos.filter(p => p.familia === family));
    }

    const seleccionarProducto = (producto) => {
        if (onProductoSeleccionado) {
          onProductoSeleccionado(producto);
        }
    };

  return (
    <>
        <TabContainer id="familiaProductosTabContainer" defaultActiveKey="first" onSelect={(k) => {actualizarProductosSeleccionables(k)}}>
          <Nav variant="pills" id="familiasContainer" className="familiasGrid">
            {familias.map(family => {
                return (
                <>
                    <Nav.Item>                  
                        <Nav.Link eventKey={family}>{family.toUpperCase()}</Nav.Link>
                    </Nav.Item>
                </>
                )
            })}
          </Nav>
          <TabContent id="productosContainer" className="productosGrid">
            {productosSeleccionables.map(producto => {
                return (
                <Card bg="light" text="dark" border="secondary" body="false" 
                  onClick={() => seleccionarProducto(producto)} style={{ cursor: "pointer" }}>
                    {producto.nombre}
                </Card>              
                )
            })}
          </TabContent>
        </TabContainer>
    </>    
  )
}

export default FamiliaProductos