import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RenameTableModal = ({ show, onHide, onSubmit }) => {
  const [tableName, setTableName] = useState('');

  // Función para agregar la tecla presionada
  const handleKeyClick = (key) => {
    setTableName(prev => prev + key);
  };

  // Función para eliminar el último carácter
  const handleBackspace = () => {
    setTableName(prev => prev.slice(0, -1));
  };

  // Función para limpiar el campo de texto
  const handleClear = () => {
    setTableName('');
  };

  // Al hacer submit se envía el nuevo nombre a la función onSubmit del padre
  const handleSubmit = () => {
    onSubmit(tableName);
    onHide();
    setTableName('');
  };

  // Definimos las filas del teclado virtual
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    [' ']
  ];

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar nombre de la mesa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control 
            type="text" 
            placeholder="Nuevo nombre de mesa"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
        </Form.Group>
        <div className="virtual-keyboard">
          {keys.map((row, rowIndex) => (
            <div key={rowIndex} className="vk-row">
              {row.map((key, keyIndex) => (
                <button 
                  key={keyIndex} 
                  type="button" 
                  className="vk-key"
                  onClick={() => handleKeyClick(key)}
                >
                  {key === ' ' ? 'Espacio' : key}
                </button>
              ))}
            </div>
          ))}
          <div className="vk-controls">
            <button type="button" className="vk-key vk-control" onClick={handleBackspace}>Borrar</button>
            <button type="button" className="vk-key vk-control" onClick={handleClear}>Limpiar</button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameTableModal;
