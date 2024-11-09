import React, { useEffect, useState } from 'react'
import { getUser } from '../services/resourceService';

export const User = () => {

    const [message, setMessage] = useState("");

    useEffect(() => {
        // Llamar al servicio `getToken` si tenemos el código de autorización
        const fetchToken = async () => {
            try {
              const response = await getUser();
              setMessage(response);              
            } catch (err: any) {
              console.log(err);
            }          
        };    
        fetchToken();
      }, []);

  return (
    <div>{message}</div>
  )
}
