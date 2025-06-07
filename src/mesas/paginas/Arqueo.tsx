import React, { useEffect, useState } from 'react'
import '../css/arqueo.css';
import ArquearModal from './componentes/ArquearModal';
import { Button, Modal } from 'react-bootstrap';


interface Filter {
    field: string;
    operator: string;
    value: string | boolean;
  }

  

const Arqueo: React.FC = () => {
  // useStates para filtros
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [camarero, setCamarero] = useState('');
  const [camareros, setCamareros] = useState([]);
  const [sectoresSeleccionados, setSectoresSeleccionados] = useState<string[]>([]);
  const [borrada, setBorrada] = useState('');
  const [ocupada, setOcupada] = useState('');
  const [arqueada, setArqueada] = useState('false');
  const [pago, setPago] = useState('');
  
  //UseStates para resultados
  const [error, setError] = useState('');
  const [resultado, setResultado] = useState<any[]>([]);

  //useStates para modal arquear
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [success, setSuccess] = useState<boolean | null>(null);
  const [mesasParaArquear, setMesasParaArquear] = useState<any[]>([]);
  const [modalError, setModalError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchCamareros = async () => {
      const token = localStorage.getItem('access_token');

      try {
        const response = await fetch('http://localhost:9001/arqueo/camareros/buscar', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setCamareros(data);
      } catch (error) {
        console.error('Error al cargar los camareros:', error);
      }
    };

    fetchCamareros();
  }, []);


  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filters: any[] = [];

    if (fechaInicio) filters.push({ field: 'fecha_inicio', operator: '>=', value: fechaInicio });
    if (fechaFin) filters.push({ field: 'fecha_inicio', operator: '<=', value: fechaFin });
    if (camarero) filters.push({ field: 'camarero', operator: '=', value: camarero });
    if (borrada !== '') filters.push({ field: 'borrada', operator: '=', value: borrada === 'true'});
    if (ocupada !== '') filters.push({ field: 'ocupada', operator: '=', value: ocupada === 'true'});
    if (arqueada !== '') filters.push({ field: 'arqueada', operator: '=', value: arqueada === 'true'});
    if (pago !== '') filters.push({ field: 'metodo_pago', operator: '=', value: pago});
    if (sectoresSeleccionados.length > 0) {
      filters.push({ field: 'sector', operator: 'IN', value: sectoresSeleccionados.join(',') });
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Token no encontrado. Por favor inicia sesión.');
      return;
    }

    try {
      const response = await fetch('http://localhost:9001/arqueo/buscar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          filters,
          sortField: 'fecha_inicio',
          sortDirection: 'desc',
          limit: 50,
          offset: 0,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      setResultado(data || []);
      setError('');
    } catch (err) {
      setError("Hubo un problema al buscar los datos de arqueo.");
      console.error(err);
    }
  };
  
  const sectoresDisponibles = [
      { value: 'barra', label: 'Barra' },
      { value: 'terraza', label: 'Terraza' },
      { value: 'salonBarra', label: 'Salón Barra' },
      { value: 'salonComedor', label: 'Comedor' },
    ];
  const columnasOcultas = ['id', 'mesaReferencia', 'lastUpdatedAt', 'lastUpdatedBy'];

  const formatearValor = (key: string, val: any) => {
    if (key === 'cantidad') return parseFloat(val).toFixed(2)
    if (val === true || val === 'true') return 'SI'
    if (val === false || val === 'false') return 'NO'
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val))
      return new Date(val).toISOString().slice(0, 19).replace('T', ' ')
    return String(val)
  };
    


  return (
    <div className="container mt-5 arqueo-form">
      <h2 className="mb-4">Arqueo</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Fecha Inicio</label>
          <input type="date" className="form-control" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Fecha Fin</label>
          <input type="date" className="form-control" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Camarero</label>
          <select className="form-select" value={camarero} onChange={(e) => setCamarero(e.target.value)}>
              <option value="">-- Todos --</option>                
              {camareros.map((nombre) => (
                <option key={nombre} value={nombre}>
                  {nombre}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">¿Borrada?</label>
          <select className="form-select" value={borrada} onChange={(e) => setBorrada(e.target.value)}>
            <option value="">-- Todas --</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">¿Activa?</label>
          <select className="form-select" value={ocupada} onChange={(e) => setOcupada(e.target.value)}>
            <option value="">-- Todas --</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">¿Arqueada?</label>
          <select className="form-select" value={arqueada} onChange={(e) => setArqueada(e.target.value)}>
            <option value="">-- Todas --</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Pago</label>
          <select className="form-select" value={pago} onChange={(e) => setPago(e.target.value)}>
            <option value="">-- Todos --</option>
            <option value="CASH">Efectivo</option>
            <option value="TPV">TPV</option>
            <option value="POR_ARQUEO">POR_ARQUEO (Desconocido)</option>
          </select>
        </div>
        
        <div className="col-md-4 position-relative">
          <label className="form-label">Sector</label>
          <div className="dropdown">
            <button
              className="form-select text-start"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sectoresSeleccionados.length === 0
                ? '-- Todos --'
                : sectoresDisponibles
                    .filter(s => sectoresSeleccionados.includes(s.value))
                    .map(s => s.label)
                    .join(', ')
              }
            </button>
            <ul className="dropdown-menu p-2" style={{ minWidth: '100%' }}>
              {sectoresDisponibles.map((sector) => (
                <li key={sector.value}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`sector-${sector.value}`}
                      value={sector.value}
                      checked={sectoresSeleccionados.includes(sector.value)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setSectoresSeleccionados((prev) =>
                          checked ? [...prev, value] : prev.filter((s) => s !== value)
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor={`sector-${sector.value}`}>
                      {sector.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">Buscar</button>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>

      <hr className="my-4" />

      <div>
        <h4>Resultados</h4>
        {resultado.length > 0 && (
          <div className="alert alert-secondary d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="text-success fs-5">
              <strong>Total de mesas:</strong> {resultado.length} <br />
              <strong>Suma total: </strong> 
              {
                resultado.reduce((acc, curr) => {
                  const val = parseFloat(curr.cantidad);
                  return acc + (isNaN(val) ? 0 : val);
                }, 0).toFixed(2)
              }
              <strong> €</strong>
            </div>
            <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={() => {
                const noArqueadas = resultado.filter(m => !m.arqueada);
                if (noArqueadas.length === 0) {
                  setModalError("Todas las mesas ya están arqueadas.");
                  return;
                }
                setMesasParaArquear(noArqueadas);
                setShowConfirmModal(true);
              }}
            >
              Arquear seleccionadas
            </button>
              <button
                className="btn btn-outline-primary"
                disabled
                onClick={() => {
                  alert('La funcionalidad de impresión aún no está disponible.');
                  // Aquí podrías hacer un fetch al endpoint de impresión en el futuro
                }}
              >
                Imprimir
              </button>
            </div>
          </div>
          
        )}
        {modalError && (
          <div className="alert alert-warning mt-3">
            {modalError}
            <button className="btn-close float-end" onClick={() => setModalError(null)}></button>
          </div>
        )}
        {resultado.length === 0 ? (
          <p>No se encontraron resultados.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  {Object.keys(resultado[0]).filter(key => !columnasOcultas.includes(key)).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resultado.map((row, idx) => (
                  <tr key={idx}>                    
                    {Object.entries(row)
                      .filter(([key]) => !columnasOcultas.includes(key))
                      .map(([key, val], i) => (
                        <td key={i}>
                          {formatearValor(key, val)}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <ArquearModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        ids={mesasParaArquear.map(m => m.id)}
        usuario={localStorage.getItem('nombreCamarero')??'Desconocido'}
        tieneSinCobrar={resultado.some(m => m.estado !== 'COBRADA')}
        onSuccess={() => {
          setResultMessage('Mesas arqueadas correctamente.');
          setSuccess(true);
          setShowResultModal(true);
          // Opcional: recargar resultados si quieres
          // handleSubmit(new Event('submit') as unknown as React.FormEvent);
        }}
        onError={(msg) => {
          setResultMessage(msg);
          setSuccess(false);
          setShowResultModal(true);
          setModalError(msg);
        }}
      />

      <Modal show={showResultModal} onHide={() => setShowResultModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{success ? 'Éxito' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{resultMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowResultModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>        
      </Modal>      

    </div>
  )
}

export default Arqueo