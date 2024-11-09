import {TokenService} from '../services/tokenService.tsx';

interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

const fetchWithAuth = async(url:string, options: FetchOptions ={}): Promise<any> => {
    //obtenemos el token del servicio de token
    const token = TokenService.getAccessToken();

    //si el token existe y la URL contiene resources, entonces agregamos el bearer
    if(token && url.includes('resource')){

        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
        console.log(`entonces la url sera: ${options}`)
    }
    console.log(`y ahora la url sera: ${options}`)

    const response = await fetch(url, options);

    // console.log(`respuesta es sera: ${await response.text()}`)

    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    return await response.text();
};

export default fetchWithAuth;