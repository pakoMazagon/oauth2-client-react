
import './App.css'
import { BrowserRouter, } from 'react-router-dom';
import AppWrap from './AppWrap';

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

function App() {

  return (
    <>
    <BrowserRouter>
      <AppWrap></AppWrap>
    </BrowserRouter>          
    </>
  )
}

export default App
