import React, { useEffect } from 'react'
import { TokenService } from '../services/tokenService';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {

    const navigate = useNavigate();
    useEffect(() => {        
        TokenService.clearTokens();
        navigate('/');
      }, []);
      
  return (
    <div>Logout</div>
  )
}
