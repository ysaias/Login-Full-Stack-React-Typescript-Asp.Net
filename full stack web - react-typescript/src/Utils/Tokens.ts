import { userInformation } from "../Components/Authentication/AuthorizationContext";


const nombreToken = "fswToken";

export function guardarToken(token: string){
    localStorage.setItem(nombreToken, token)
}

export function leerToken(propiedad: string): string{
    const token = localStorage.getItem(nombreToken);
    if(!token){
        return "";
    }

    const dataToken = JSON.parse(atob(token.split(".")[1]));
    return dataToken[propiedad]
}


export function logout(){
    localStorage.removeItem(nombreToken);
    window.location.href = "/indetificate";
}

export function getUserInformations(): userInformation[]{
    const token = localStorage.getItem(nombreToken);
    if(!token){
        return [];
    }

    const dataToken = JSON.parse(atob(token.split(".")[1]));
    const respuesta: userInformation[] = [];
    for(const propiedad in dataToken){
        respuesta.push({name: propiedad, value: dataToken[propiedad]});
    }

    return respuesta;
}
