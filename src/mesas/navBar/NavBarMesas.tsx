
import { NavLink, useLocation } from "react-router-dom"
import '../css/mesas.css'
import { useState } from "react";

const NavBarMesas = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  // Función para cerrar el menú al hacer clic en un enlace
  const handleLinkClick = () => {
    setMenuOpen(false);
    console.log('clicka')
  };
   
  return (
    <nav className="navbar">
      {/* Botón menú hamburguesa */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
         ☰ 
      </div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="salonBarra" className={({ isActive }) => (isActive ? "active" : "")} onClick={handleLinkClick}>
          Salon Barra
        </NavLink>
        <NavLink to="salonComedor" className={({ isActive }) => {
          console.log("Checking active state", isActive);
          return isActive ? "active" : "";
        }} onClick={handleLinkClick}>
          Salon Comedor
        </NavLink>        
        <NavLink to="barra" className={({ isActive }) => (isActive ? "active" : "")} onClick={handleLinkClick}>
          Barra
        </NavLink>
        <NavLink to="terraza" className={({ isActive }) => (isActive ? "active" : "")} onClick={handleLinkClick}>
          Terraza
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBarMesas