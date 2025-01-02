
import './App.css'
import Menu from './components/Menu';
import AppRouter from './components/AppRouter';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';


function AppWrap() {

  const menuRef = useRef<any>(null);
  
  const location = useLocation();

  useEffect(() => {
    console.log(`useEffect de Appwrap ${menuRef.current}`)
    if (menuRef.current) {
      console.log(`useEffect de Appwrap dentro de current ${menuRef.current.getLogged()}`)
      menuRef.current.getLogged();
    }
  }, [location]);

  return (
    <>
      <Menu ref={menuRef}></Menu>
      <AppRouter />      
    </>
  )
}

export default AppWrap
