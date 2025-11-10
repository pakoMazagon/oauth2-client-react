// TouchNumberModal.tsx
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface TouchNumberModalProps {
  show: boolean;
  onHide: () => void;
  onApply: (value: number | "") => void;
  initialValue: number | "";
}

const TouchNumberModal: React.FC<TouchNumberModalProps> = ({
  show,
  onHide,
  onApply,
  initialValue,
}) => {
  // El valor interno se maneja como string para facilitar la edición
  const [value, setValue] = useState(String(initialValue) || "");

  const handleKey = (key: string) => {
    switch (key) {
      case "BORRAR":
        setValue((v) => v.slice(0, -1));
        break;
      case ".":
        // Permitir solo un punto decimal
        if (!value.includes(".")) {
          setValue((v) => v + ".");
        }
        break;
      default:
        // Evitar múltiples ceros al inicio si está vacío
        if (value === "0" && key === "0") return;
        setValue((v) => v + key);
        break;
    }
  };

  const handleOk = () => {
    const numericValue = value === "" ? "" : parseFloat(value);
    onApply(numericValue);
    onHide();
  };
  
  // Resetea el valor cuando el modal se muestra (sincroniza con initialValue)
  React.useEffect(() => {
    setValue(String(initialValue) || "");
  }, [initialValue, show]);


  const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <Modal show={show} onHide={onHide} centered size="sm" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Dinero Recibido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div 
          className="p-3 mb-3" 
          style={{ border: "2px solid #ccc", borderRadius: "8px", fontSize: "1.5rem", textAlign: "center", background: "#f9f9f9" }}
        >
          € {value || <span style={{ color: "#999" }}>0.00</span>}
        </div>

        <div className="d-grid gap-2">
        <div className="d-flex flex-wrap">
            {["7", "8", "9", "4", "5", "6", "1", "2", "3", ".","0","."].map((digit) => (
                <Button
                    key={digit}
                    variant="secondary"
                    onClick={() => handleKey(digit)}
                    style={{ width: '33%', marginBottom: '5px' }}
                    >
                    {digit}
                </Button>                    
            ))}            
        </div>

          <div className="d-flex justify-content-center flex-wrap">
            {/* Cero y Borrar */}
            <Button variant="danger" size="lg" className="m-1" style={{ width: "3.5rem", height: "3.5rem" }} onClick={() => handleKey("BORRAR")}>
                &#x2b05;
            </Button>
          </div>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleOk}>Aplicar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TouchNumberModal;