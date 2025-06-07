// src/components/ArquearModal.tsx

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ArquearModalProps {
  show: boolean;
  onClose: () => void;
  ids: string[];
  usuario: string;
  tieneSinCobrar: boolean;
  onSuccess: () => void;
  onError: (msg: string) => void;  
}

const ArquearModal: React.FC<ArquearModalProps> = ({ show, onClose, ids, usuario, tieneSinCobrar, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');

    try {
      const res = await fetch('http://localhost:9001/arqueo/arquear', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids, usuario }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        onError(data.message || 'Error al arquear mesas.');
      } else {
        onSuccess();
      }
    } catch (err) {
      onError('Error de conexión al servidor.');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar arqueo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Deseas arquear <strong>{ids.length}</strong> mesas?</p>
        <p className="text-danger">Una vez arqueadas, no se podrán des-arquear.</p>
        {tieneSinCobrar && (
          <p className="text-warning">⚠️ Hay mesas sin cobrar. ¿Estás seguro?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={loading}>
          {loading ? 'Arqueando...' : 'Sí, arquear'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ArquearModal;
