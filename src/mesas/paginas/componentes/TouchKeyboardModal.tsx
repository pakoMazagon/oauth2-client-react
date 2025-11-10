import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
// import { FaBackspace } from "react-icons/fa";

export default function TouchKeyboardModal({
  show,
  onHide,
  onApply,
  title = "Introducir texto",
  initialValue = "",
}) {
  const [value, setValue] = useState(initialValue);

  // 🔄 Actualiza el texto cuando cambia el campo activo o se abre el teclado
  useEffect(() => {
    console.log('SALE??')
    setValue(String(initialValue) || "");
  }, [initialValue, show]);

  const handleKey = (key) => {
    if (key === "BORRAR") setValue((v) => v.slice(0, -1));
    else if (key === "ESPACIO") setValue((v) => v + " ");
    else setValue((v) => v + key);
  };

  const handleOk = () => {
    onApply(value);
    onHide();
  };

  const letrasFila1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const letrasFila2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"];
  const letrasFila3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const numerosFila = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            border: "2px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            fontSize: "1.5rem",
            textAlign: "center",
            marginBottom: "15px",
            userSelect: "none",
            background: "#f9f9f9",
          }}
        >
          {value || <span style={{ color: "#999" }}>Toca para escribir...</span>}
        </div>

        <div className="keyboard">
          {[numerosFila, letrasFila1, letrasFila2, letrasFila3].map(
            (fila, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "8px",
                }}
              >
                {fila.map((key) => (
                  <Button
                    key={key}
                    variant="light"
                    style={{
                      margin: "3px",
                      width: "3rem",
                      height: "3rem",
                      fontSize: "1.2rem",
                    }}
                    onClick={() => handleKey(key)}
                  >
                    {key}
                  </Button>
                ))}
              </div>
            )
          )}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="secondary"
              style={{ margin: "3px", width: "8rem", height: "3rem" }}
              onClick={() => handleKey("ESPACIO")}
            >
              Espacio
            </Button>              
            <Button
              variant="warning"
              style={{
                margin: "3px",
                width: "4rem",
                height: "3rem",
                fontSize: "1.2rem",
              }}
              onClick={() => handleKey("BORRAR")}
            >
                Borra
              {/* <FaBackspace /> */}
            </Button>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleOk}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
