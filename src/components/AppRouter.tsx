import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Authorized from './Authorized';
import { User } from './User';
import { Logout } from './Logout';

const AppRouter = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authorized" element={<Authorized />} />
        <Route path="/user" element={<User />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>    
  );
};

export default AppRouter;
