import React, { useEffect, useState } from 'react'
import { getAdmin } from '../services/resourceService';

export const Admin = () => {

    const [message, setMessage] = useState("");

    useEffect(() => {
        // Llamar al servicio `getToken` si tenemos el código de autorización
        const fetchToken = async () => {
            try {
              const response = await getAdmin();
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
