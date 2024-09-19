import { ReactElement, useContext } from "react";
import AuthorizationContext from "./AuthorizationContext";

export default function Authentication(props: authenticationProps){
    const {userInformations} = useContext(AuthorizationContext);

    return(
        <>
            {userInformations && userInformations.length>0 ? props.authenticated : props.noAuthenticated}
        </>
    )
}

interface authenticationProps{
    authenticated: ReactElement;
    noAuthenticated?: ReactElement;
}