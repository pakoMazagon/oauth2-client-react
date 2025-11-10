// CobroMesaModal.tsx
import { useState } from "react";
import { Button, Form, Modal, Image } from "react-bootstrap";
import imgCobrar from "../../../assets/billete.png";
import imgTpv from "../../../assets/tpv.png";
import imgFactura from "../../../assets/factura.png";
import '../../../productos/css/productos.css';

// Importa el nuevo componente
import TouchNumberModal from "./TouchNumberModal.tsx"; 

interface CobroModalProps {
    show: boolean;
    handleClose: () => void;
    total: number; // Total a cobrar
    // 💡 NOTA: onCobrar parece tener 3 argumentos según la interfaz, pero se llama con 2.
    // Lo corregiremos en el onClick.
    onCobrar: (cambio: number, efectivo: boolean, tpv: boolean) => void; 
}
 
// Es importante tipar las props del componente
const CobroMesaModal: React.FC<CobroModalProps> = ({ show, handleClose, total, onCobrar }) => {

    const [recibido, setRecibido] = useState<number | "">("");
    const [mostrarTecladoNumerico, setMostrarTecladoNumerico] = useState(false); // Nuevo estado

    const cambio = recibido !== "" ? parseFloat(recibido.toString()) - total : 0;

    // Función para manejar el valor aplicado desde el modal numérico
    const handleAplicarTeclado = (valor: number | "") => {
        setRecibido(valor);
    };

    // Función para abrir el modal numérico al hacer clic en el input
    const handleInputClick = () => {
        setMostrarTecladoNumerico(true);
    };
    
    // 💡 Función para manejar el cobro. 
    // Usamos el `cambio` calculado. La interfaz de onCobrar pide 3 argumentos.
    const handleCobrar = (esEfectivo: boolean, esTpv: boolean) => {
        // Asumiendo que el primer argumento de onCobrar es el cambio
        onCobrar(cambio, esEfectivo, esTpv); 
        handleClose();
    }


    return (
      <>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
              <Modal.Title>Cobro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="mb-3">
              <h5>Total a cobrar: <span className="text-success">€{total.toFixed(2)}</span></h5>
              </div>

              <Form.Group className="mb-3">
              <Form.Label>Dinero recibido</Form.Label>
              <Form.Control
                  type="text" // Cambiado a text para usar el click, ya no es type="number"
                  value={recibido === "" ? "" : recibido.toFixed(2)}
                  readOnly // Hacemos que el input sea solo lectura
                  onClick={handleInputClick} // Abre el modal numérico
                  placeholder="Ingrese el dinero recibido"
              />
              </Form.Group>

              <div className="mb-3">
              <h5>Cambio: <span className={cambio >= 0 ? "text-primary" : "text-danger"}>€{cambio.toFixed(2)}</span></h5>
              </div>
          </Modal.Body>

          {/* ----------------------------------------------------- */}
          {/* 💡 CORRECCIÓN 2: Lógica de botones */}
          {/* ----------------------------------------------------- */}
          <Modal.Footer className="botonesCobro">
              <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
              
              {/* Botón EFECTIVO */}
              <Button 
                  variant="outline-primary"
                  // Deshabilitado SOLO si el cambio es negativo (no se ha cubierto el total)
                  disabled={cambio < 0} 
                  onClick={() => handleCobrar(true, false)}
              >
                  <Image src={imgCobrar} alt="Cobrar" width={24} height={24} roundedCircle/>
                  Efectivo
              </Button>

              {/* Botón TPV (PAGO COMPLETO) */}
              <Button 
                  variant="outline-success"
                  // El TPV (tarjeta) generalmente cubre el total exacto. 
                  // Si el total está cubierto (recibido >= total O si no se ha introducido nada,
                  // lo que implica el pago exacto con tarjeta), se habilita.
                  // Aquí simplificaremos: si NO se ha introducido nada, es TPV directo.
                  // Si se ha introducido algo, debe ser suficiente.
                  disabled={recibido !== "" && cambio < 0}
                  onClick={() => handleCobrar(false, true)}
              >
                  <Image src={imgTpv} alt="Cobrar" roundedCircle />
                  TPV
              </Button>
              
              {/* Opción para Factura (Mantengo la imagen aunque no estaba en la lógica de cobro) */}
              {/* <Button variant="outline-info">
                  <Image src={imgFactura} alt="Factura" roundedCircle />
                  Factura
              </Button> */}
              
          </Modal.Footer>
        </Modal>

        {/* Modal del teclado numérico */}
        <TouchNumberModal
            show={mostrarTecladoNumerico}
            onHide={() => setMostrarTecladoNumerico(false)}
            onApply={handleAplicarTeclado}
            initialValue={recibido}
        />
      </>
    )
}
 
export default CobroMesaModal;