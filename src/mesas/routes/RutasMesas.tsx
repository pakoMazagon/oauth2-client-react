import NavBarMesas from '../navBar/NavBarMesas'
import { Navigate, Route, Routes } from 'react-router-dom'
import SalonBarra from '../paginas/SalonBarra'
import SalonComedor from '../paginas/SalonComedor'
import Terraza from '../paginas/Terraza'
import Barra from '../paginas/Barra'
import Libreta from '../paginas/Libreta'

const RutasMesas = () => {
  return (
    <>
        <NavBarMesas></NavBarMesas>
        <Routes>
            <Route path="salonBarra" element={<SalonBarra/>}></Route>
            <Route path="salonComedor" element={<SalonComedor/>}></Route>
            <Route path="terraza" element={<Terraza/>}></Route>
            <Route path="barra" element={<Barra/>}></Route>
            <Route path=":sector/:nombreTradicional" element={<Libreta/>}></Route>
            <Route path="/" element={<Navigate to="salonBarra"/>}></Route>
        </Routes>
    </>
  )
}

export default RutasMesas