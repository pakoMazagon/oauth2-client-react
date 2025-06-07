import { Button, Modal } from "react-bootstrap";
  
  function BorraMesaModal({ show, onHide, onSubmit }) {
    
    const handleBorrarSubmit = (confirm:boolean) => {
        if(confirm){
            onSubmit(confirm);
        }        
        onHide(); // Cerrar modal al hacer clic en una opción
    }
  
    return (
        <Modal show={show} onHide={onHide} centered>        
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Borrar Mesa
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>¿Estás seguro de borrar la mesa?</h5>            
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleBorrarSubmit(true)}>Sí</Button>
                <Button onClick={() => handleBorrarSubmit(false)}>No</Button>
            </Modal.Footer>
      </Modal>
    );
  };

  export default BorraMesaModal;