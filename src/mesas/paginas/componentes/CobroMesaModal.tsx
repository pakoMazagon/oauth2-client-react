import { useState } from "react";
import { Button, Form, Modal, Image } from "react-bootstrap";
import imgCobrar from "../../../assets/billete.png"
import imgTpv from "../../../assets/tpv.png"
import imgFactura from "../../../assets/factura.png"
import '../../../productos/css/productos.css'

interface CobroModalProps {
    show: boolean;
    handleClose: () => void;
    total: number; // Total a cobrar
    onCobrar: (cambio: number, efectivo: boolean, tpv: boolean) => void; // Función al cobrar
  }
  
  
const CobroMesaModal = ({show, handleClose, total, onCobrar}) => {

    const [recibido, setRecibido] = useState<number | "">("");

    const cambio = recibido !== "" ? parseFloat(recibido.toString()) - total : 0;

    return (
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
                type="number"
                value={recibido}
                onChange={(e) => setRecibido(e.target.value ? parseFloat(e.target.value) : "")}
                placeholder="Ingrese el dinero recibido"
            />
            </Form.Group>

            <div className="mb-3">
            <h5>Cambio: <span className={cambio >= 0 ? "text-primary" : "text-danger"}>€{cambio.toFixed(2)}</span></h5>
            </div>
        </Modal.Body>

        <Modal.Footer className="botonesCobro">
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="outline-primary"
                disabled={recibido === "" || cambio < 0}
                onClick={() => {
                onCobrar(true,false);
                handleClose();
            }}
            >
                <Image src={imgCobrar} alt="Cobrar"  width={24} height={24} roundedCircle/>
                Efectivo
            </Button>
            <Button variant="outline-success"
                disabled={recibido === "" || cambio < 0}
                onClick={() => {
                    onCobrar(false,true);
                    handleClose();
                }}
            >
                <Image src={imgTpv} alt="Cobrar"  roundedCircle />
                TPV
            </Button>
        </Modal.Footer>
      </Modal>
    )
}
  
  export default CobroMesaModal