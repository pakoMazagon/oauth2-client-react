import { Modal, Button } from "react-bootstrap";

const EstadoModal = ({ show, onHide, onSubmit }) => {
  const opcionesEstado = [
    { color: "red", estado: "POR_PEDIR", texto: "Por pedir a cocina" },
    { color: "#FFD700", estado: "PEDIDO_A_COCINA", texto: "Pedir a cocina" },
    { color: "green", estado: "SERVIDO", texto: "Puesto en mesa" },
  ];

  const handleEstadoChange = (estado) => {
    onSubmit(estado);
    onHide(); // Cerrar modal al hacer clic en una opción
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar Estado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="estado-opciones">
          {opcionesEstado.map((opcion) => (
            <Button
              key={opcion.estado}
              className="estado-boton"
              style={{ backgroundColor: opcion.color }}
              onClick={() => handleEstadoChange(opcion.estado)}
            >
              {opcion.texto}
            </Button>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EstadoModal;
