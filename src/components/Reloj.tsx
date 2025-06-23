import { useEffect, useState } from "react";

const Reloj = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="fs-5 text-muted">⏰ {hora.toLocaleTimeString()}</span>;
};

export default Reloj;
