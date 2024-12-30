
import { NavLink, useLocation } from "react-router-dom"
import '../css/mesas.css'

const NavBarMesas = () => {
   
  return (
    <nav>
      <div>
        <NavLink to="salonBarra" className={({ isActive }) => (isActive ? "active" : "")}>
          Salon Barra
        </NavLink>
        <NavLink to="salonComedor" className={({ isActive }) => {
          console.log("Checking active state", isActive);
          return isActive ? "active" : "";
        }}>
          Salon Comedor
        </NavLink>        
        <NavLink to="barra" className={({ isActive }) => (isActive ? "active" : "")}>
          Barra
        </NavLink>
        <NavLink to="terraza" className={({ isActive }) => (isActive ? "active" : "")}>
          Terraza
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBarMesas