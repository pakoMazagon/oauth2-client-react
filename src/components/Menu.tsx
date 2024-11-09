// src/components/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

const authorize_uri:String = 'http://localhost:9000/oauth2/authorize';

const Menu = () => {
    function onLogin(): React.MouseEventHandler<HTMLButtonElement> | undefined| any {
        //throw new Error('Function not implemented.');
        const params: any = {
            client_id: 'pruebaCliente2',
            redirect_uri: 'http://127.0.0.1:5173/authorized',
            scope: 'openid',
            response_type: 'code',
            response_mode: 'form_post',
            code_challenge_method: 'S256',
            code_challenge: 'Bs-1x_FmZoiPTlGRYTNaAt6UqmVkFip_hEh-kaBGTaw',
            token_url: 'http://localhost:9000/oauth2/token'
        }
        const queryParams = new URLSearchParams(params).toString();
        const codeUrl = `${authorize_uri}?${queryParams}`;
        window.location.href = codeUrl; // Redirige a la URL de autorización

    }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
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
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/user">
                User
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link className="nav-link active" aria-current="page" to="/admin">
                Admin
              </Link> */}
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <button className="btn btn-outline-success" type="button" onClick={() => onLogin()}>Login</button>
            <button className="btn btn-outline-danger" type="button">Logout</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
