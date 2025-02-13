import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface CalculatorModalProps {
    show: boolean;
    onHide: () => void;
    onApply: (value: number, isPrice: boolean) => void;
    initialValue?: number;
    title?: string;
}

const CalculatorModal: React.FC<CalculatorModalProps> = ({
    show,
    onHide,
    onApply,
    initialValue = 0,
    title = 'Modificar Producto'
  }) => {

    const [inputValue, setInputValue] = useState<string>(initialValue.toString());
    // Cada vez que cambie initialValue, reiniciamos el input
    useEffect(() => {
        setInputValue(initialValue.toString());
    }, [initialValue]);

    const handleButtonClick = (digit: string) => {
        if (digit === "<-") {
            handleBackspace();
        } else {
            setInputValue((prev) => (prev === "0" ? digit : prev + digit));
        }
    };

    const handleClear = () => {
        setInputValue("0");
    };

    const handleBackspace = () => {
        setInputValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    };

    const handleApply = (isPrice: boolean) => {
        const numericValue = parseFloat(inputValue);
        onApply(numericValue, isPrice);
        onHide();
    };


  return (
    <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control
                type="text"
                value={inputValue}
                readOnly
                style={{ fontSize: '2rem', textAlign: 'right', marginBottom: '1rem' }}
            />
            <div className="d-flex flex-wrap">
                {["7", "8", "9", "4", "5", "6", "1", "2", "3", "<-","0","."].map((digit) => (
                    <Button
                        key={digit}
                        variant="secondary"
                        onClick={() => handleButtonClick(digit)}
                        style={{ width: '33%', marginBottom: '5px' }}
                        >
                        {digit}
                    </Button>                    
                ))}
                <Button
                    variant="warning"
                    onClick={handleBackspace}
                    style={{ width: '50%', marginBottom: '5px' }}>
                    Borrar
                </Button>
                <Button
                    variant="danger"
                    onClick={handleClear}
                    style={{ width: '50%', marginBottom: '5px' }}>
                    Limpiar
                </Button>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cancelar
            </Button>
            <Button variant="primary" onClick={() => handleApply(true)}>
                Precio
            </Button>
            <Button variant="primary" onClick={() => handleApply(false)}>
                Cantidad
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CalculatorModal