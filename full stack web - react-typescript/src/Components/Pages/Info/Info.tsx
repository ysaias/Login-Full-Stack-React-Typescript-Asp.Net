import Authentication from "../../Authentication/Auhentication";

export default function Info(){
    return(
        <Authentication 
            authenticated={
                <div>Info</div>
            }
            noAuthenticated={
                <div>
                    No tienes permisos. Por favor, Identifíquese o Regístrese.
                </div>
            }
        
        />
        
    )
}