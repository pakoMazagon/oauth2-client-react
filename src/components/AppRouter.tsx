import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Authorized from './Authorized';
import { User } from './User';
import { Logout } from './Logout';
import { Admin } from './Admin';
import RutasMesas from '../mesas/routes/RutasMesas';
import Arqueo from '../mesas/paginas/Arqueo';

const AppRouter = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authorized" element={<Authorized />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mesas/*" element={<RutasMesas />}/>
        <Route path="/logout" element={<Logout />} />
        <Route path="/arqueo" element={<Arqueo />} />
        <Route path="/consultas" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>    
  );
};

export default AppRouter;
