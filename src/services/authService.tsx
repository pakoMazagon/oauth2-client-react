
export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    [key: string]: any; // Para otros campos que puedan estar en la respuesta
}

const { VITE_TOKEN_URL, VITE_GRANT_TYPE, VITE_CLIENT_ID, VITE_REDIRECT_URI, VITE_SCOPE, VITE_CODE_VERIFIER } = import.meta.env;


export const getToken = async (code: string): Promise<TokenResponse> => {
    const body = new URLSearchParams();
    body.set('grant_type', VITE_GRANT_TYPE || '');
    body.set('client_id', VITE_CLIENT_ID || '');
    body.set('redirect_uri', VITE_REDIRECT_URI || '');
    body.set('scope', VITE_SCOPE || '');
    body.set('code_verifier', VITE_CODE_VERIFIER || '');
    body.set('code', code);

    const basicAuth = 'Basic ' + btoa('pruebaCliente2:secretCliente');

    console.log("GRANT_TYPE:", VITE_GRANT_TYPE);

    const response = await fetch(VITE_TOKEN_URL || '',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'Authorization': basicAuth
        },
        body: body.toString(),
    });

    if(!response.ok){
        const errorDetails = await response.text(); // o response.json() si devuelve JSON
        console.log(`Failed to fetch token: ${errorDetails}`);
        throw new Error(`Failed to fetch token: ${errorDetails}`);
    }

    return await response.json();
}