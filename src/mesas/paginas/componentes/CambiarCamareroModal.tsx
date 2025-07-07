import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {useMesas} from "../../../contextos/contextoMesas.js"; // Ajusta según tu path

type CambiarCamareroModalProps = {
  open: boolean;
  onClose: () => void;
  mesaId: string;
  onSuccess?: () => void;
};

export function CambiarCamareroModal({ open, onClose, mesaId, onSuccess }: CambiarCamareroModalProps) {
  const { mesas, updateMesaAccion } = useMesas();
  const [nuevoCamarero, setNuevoCamarero] = useState("");

  const camareros = [...new Set(mesas.map(m => m.camarero).filter(Boolean))];

  const handleConfirm = () => {
    if (!nuevoCamarero) return;
    updateMesaAccion(mesaId, "PATCH", "cambiarCamarero", nuevoCamarero);
    onClose();
    onSuccess?.();
  };

  return (
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar camarero</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="camareroSelect">
          <Form.Label>Selecciona un nuevo camarero:</Form.Label>
          <Form.Select
            value={nuevoCamarero}
            onChange={(e) => setNuevoCamarero(e.target.value)}
          >
            <option value="">-- Elegir camarero --</option>
            {camareros.map((camarero) => (
              <option key={camarero} value={camarero}>
                {camarero}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm} disabled={!nuevoCamarero}>
          Cambiar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
