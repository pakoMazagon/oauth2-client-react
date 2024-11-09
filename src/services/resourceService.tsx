import fetchWithAuth from "../interceptors/resourceInterceptors";

const { VITE_RESOURCE_URL } = import.meta.env;

export const getUser = async (): Promise<string> => {
    const userUrl = VITE_RESOURCE_URL + 'user';    
    const response = await fetchWithAuth(userUrl)
    return await response;
}

export const getAdmin = async (): Promise<string> => {
    const adminUrl = VITE_RESOURCE_URL + 'admin';
    const response = await fetchWithAuth(adminUrl)
    return await response.json();
}