// src/components/Menu.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TokenService } from '../services/tokenService';
import CryptoJS from 'crypto-js';
import LogoBar from '../assets/LogoBar.png';
import { NavDropdown } from 'react-bootstrap';

const { VITE_AUTHORIZED_URL} = import.meta.env;

const authorize_uri:String = VITE_AUTHORIZED_URL;
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const { VITE_LOGOUT_URL, VITE_CODE_CHALLENGE_METHOD, VITE_REDIRECT_URI } = import.meta.env;

const Menu = () => {

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    getLogged();
    console.log('useEffectMenu')
  }, [onLogin, onLogout]);
  
  function onLogin(): React.MouseEventHandler<HTMLButtonElement> | undefined| any {
      console.log("EN MENU onLogin?")
      const params: any = {
          client_id: 'pruebaCliente2',
          redirect_uri: VITE_REDIRECT_URI,
          scope: 'openid profile',
          response_type: 'code',
          response_mode: 'form_post',
          // token_url: 'http://localhost:9000/oauth2/token',
          code_challenge_method: VITE_CODE_CHALLENGE_METHOD
      }
      const code_verifier = generateCodeVerifier();
      TokenService.setVerifier(code_verifier);
      params.code_challenge = generateCodeChallenge(code_verifier);
      const queryParams = new URLSearchParams(params).toString();
      const codeUrl = `${authorize_uri}?${queryParams}`;
      window.location.href = codeUrl; // Redirige a la URL de autorización

  }

  function onLogout(): React.MouseEventHandler<HTMLButtonElement> | undefined| any {      
    //location.href = VITE_LOGOUT_URL;        
    // TokenService.clearTokens();
    window.location.href = VITE_LOGOUT_URL; // Redirige a la URL de autorización
  }

  const generateCodeVerifier = ():string =>{
    let result = '';
    const char_lenght = CHARACTERS.length;
    for(let i=0; i<44;i++){
      result += CHARACTERS.charAt((Math.floor(Math.random() * char_lenght)))
    }
    return result;
  }

  const generateCodeChallenge =(code_verifier:string):string => {
    const codeVerifierHash = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64);
    const code_challenge = codeVerifierHash.replace(/=/g, '').replace(/\+/g,'-').replace(/\//g,'_');
    return code_challenge;
  }

  const getLogged = () => {
    console.log('getLogged en MENU')
    setIsLogged(TokenService.isLogged());
    setIsAdmin(TokenService.isAdmin());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={LogoBar} style={{ height: '50px' }}></img>

        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {isLogged && (
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  User
                </Link>
              </li>
            )}
            {isLogged && (
              <li className="nav-item">
                <Link className="nav-link" to="/mesas">
                  Mesas
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/arqueo">
                  Arqueo
                </Link>
              </li>
            )}
            {isAdmin && (
            <NavDropdown title="Acciones" id="operaciones-dropdown">
              <NavDropdown.Item as={Link} to="/arqueo">
                Arqueo
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cocina">
                Cocina
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/operacion3">
                <a className="nav-link disabled" aria-disabled="true">
                  Futura Acción
                </a>
              </NavDropdown.Item>
            </NavDropdown>
            )}
          </ul>
          <form className="d-flex" role="search">
            {!isLogged ? (
              <button className="btn btn-outline-success" type="button" onClick={() => onLogin()}>Login</button>
            ) : (
            <button className="btn btn-outline-danger" type="button" onClick={() => onLogout()}>Logout</button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
