// src/pages/Cocina.tsx
import { usePedidos } from "../contextos/contextoPedidos";
import { useEffect, useState } from "react";
import { EstadoProductoEnum } from "../../productos/dominio/ProductoTypes";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import Reloj from "../../components/Reloj";
import '../css/cocina.css'

const formatHora = (fecha: string | Date | null) => {
    console.log('La fecha es:'+fecha)
    if (!fecha) return "-";
    const date = typeof fecha === "string" ? new Date(fecha) : fecha;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

export default function Cocina() {
  const { pedidos, fetchPedidos } = usePedidos();
  const [sortedPedidos, setSortedPedidos] = useState(pedidos);  

  useEffect(() => {
    fetchPedidos();
    const interval = setInterval(() => {
      fetchPedidos();
    }, 1 * 60 * 1000); // cada minuto actualizamos
    return () => clearInterval(interval);
  }, []);
  

  useEffect(() => {
    const estadoPrioridad: Record<EstadoProductoEnum, number> = {
      [EstadoProductoEnum.PEDIDO_A_COCINA]: 1,
      [EstadoProductoEnum.POR_PEDIR]: 2,
      [EstadoProductoEnum.PUESTO_EN_MESA]: 3
    };
    const sorted = [...pedidos].sort((a, b) => {
    const prioridadA = estadoPrioridad[a.product.estado] ?? 99;
    const prioridadB = estadoPrioridad[b.product.estado] ?? 99;
  
      if (prioridadA !== prioridadB) {
        return prioridadA - prioridadB; // menor prioridad primero
      }
  
      // Si tienen la misma prioridad, ordenar por fechaHoraPedido descendente
      const fechaA = new Date(a.product.fechaHoraPedido).getTime();
      const fechaB = new Date(b.product.fechaHoraPedido).getTime();
      return fechaB - fechaA; // más reciente primero
    });
  
    setSortedPedidos(sorted);
  }, [pedidos]);

  const diezMinPasaron = (pedido: Pedido) => {
    const fechaPedido = new Date(pedido.product.fechaHoraPedido).getTime();
    return pedido.product.estado === EstadoProductoEnum.PEDIDO_A_COCINA &&
           (Date.now() - fechaPedido > 10 * 60 * 1000);
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-2 align-items-center justify-content-between">
        <Col>
            <h2 className="mb-0 text-center">Pedidos en Cocina</h2>
        </Col>
        <Col xs="auto">
          <Reloj />
        </Col>
      </Row>
      <Row>
        <Col>
          
          <div className="table-responsive">
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>Camarero</th>
                  <th>Sector</th>
                  <th>Mesa</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                  <th>Hora Pedido</th>
                  <th>Hora Servido</th>
                </tr>
              </thead>
              <tbody>
                {sortedPedidos.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-muted">
                      No hay pedidos disponibles.
                    </td>
                  </tr>
                ) : (
                    sortedPedidos.map((pedido, idx) => (
                    <tr key={idx}>
                      <td>{pedido.camarero}</td>
                      <td>{pedido.sector}</td>
                      <td>{pedido.nombreMesa}</td>
                      <td>{pedido.product.nombre}</td>
                      <td>{pedido.product.unidades}</td>
                      <td>
                        <Badge
                          bg={
                            pedido.product.estado === EstadoProductoEnum.PUESTO_EN_MESA
                              ? "success"
                              : pedido.product.estado === EstadoProductoEnum.PEDIDO_A_COCINA? "warning"
                                : pedido.product.estado === EstadoProductoEnum.POR_PEDIR? "danger"
                                    : ""
                          }
                          className={diezMinPasaron(pedido) ? "parpadeo" : ""}
                        >
                          {pedido.product.estado}
                        </Badge>
                      </td>
                      <td>{formatHora(pedido.product.fechaHoraPedido)}</td>
                      <td>{formatHora(pedido.product.fechaHoraServido)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
