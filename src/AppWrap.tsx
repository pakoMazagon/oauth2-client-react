
import './App.css'
import Menu from './components/Menu';
import AppRouter from './components/AppRouter';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

// const environment:object = {
//   production: false,
//   authorize_uri: 'http://localhost:9000/oauth2/authorize?',
//   client_id: 'pruebaCliente2',
//   redirect_uri: 'http://127.0.0.1:5173/authorized',
//   scope: 'openid profile',
//   response_type: 'code',
//   response_mode: 'form_post',
//   code_challenge_method: 'S256',
//   code_challenge: 'PbdysxbbfMbnAoL1aEHIvLmE1mgKARiVhwi-QUk7n7I',
//   code_verifier: 'flY3JRIEwnyLICXpEwX2Kq4tRTJwrF4Txpz9FvmULCG', GElTOUVLOdwuqveXxOcOyNtzNTBcNrkPv3Q5CDGWIkY
// };

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
      <AppRouter />
      <Menu ref={menuRef}></Menu>    
    </>
  )
}

export default AppWrap
