import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TouchKeyboardModal from "./TouchKeyboardModal.tsx";

export default function FacturaModal({ show, onHide, onSubmit }) {
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().slice(0, 16),
    cantidad: 1,
    concepto: "",
    total: "",
    cliente: "",
    cif: "",
    domicilio: "",
  });

  const [mostrarTeclado, setMostrarTeclado] = useState(false);
  const [campoActivo, setCampoActivo] = useState("");

  const handleChange = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleAplicarTeclado = (valor) => {
    handleChange(campoActivo, valor);
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formData);
    onHide();
  };

  const handleInputClick = (campo) => {
    setCampoActivo(campo);
    setMostrarTeclado(true);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Crear Factura</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* === Fecha === */}
            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="datetime-local"
                value={formData.fecha}
                onChange={(e) => handleChange("fecha", e.target.value)}
              />
            </Form.Group>

            {/* === Cantidad === */}
            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="text"
                value={formData.cantidad}
                readOnly
                onClick={() => handleInputClick("cantidad")}
              />
            </Form.Group>

            {/* === Concepto === */}
            <Form.Group className="mb-3">
              <Form.Label>Concepto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Menú diario"
                value={formData.concepto}
                readOnly
                onClick={() => handleInputClick("concepto")}
              />
            </Form.Group>

            {/* === Total === */}
            <Form.Group className="mb-3">
              <Form.Label>Total (€)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: 25.00"
                value={formData.total}
                readOnly
                onClick={() => handleInputClick("total")}
              />
            </Form.Group>

            {/* === Cliente === */}
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Juan Pérez"
                value={formData.cliente}
                readOnly
                onClick={() => handleInputClick("cliente")}
              />
            </Form.Group>

            {/* === CIF === */}
            <Form.Group className="mb-3">
              <Form.Label>CIF / NIF</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: 12345678A"
                value={formData.cif}
                readOnly
                onClick={() => handleInputClick("cif")}
              />
            </Form.Group>

            {/* === Domicilio === */}
            <Form.Group className="mb-3">
              <Form.Label>Domicilio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Calle Mayor 12, Huelva"
                value={formData.domicilio}
                readOnly
                onClick={() => handleInputClick("domicilio")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Crear Factura
          </Button>
        </Modal.Footer>
      </Modal>

      {/* === Teclado táctil alfanumérico === */}
      {mostrarTeclado && (
        <TouchKeyboardModal
          show={mostrarTeclado}
          onHide={() => setMostrarTeclado(false)}
          onApply={handleAplicarTeclado}
          title={`Introducir ${campoActivo}`}
          initialValue={String(formData[campoActivo])}
        />
      )}
    </>
  );
}
