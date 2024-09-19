import React from "react";


const AuthorizationContext = React.createContext<{
    userInformations: userInformation[];
    updateUserInformations(userInformation: userInformation[]): void;
}>({userInformations: [], updateUserInformations: () => {}})

export default AuthorizationContext;

export interface userInformation{
    name: string;
    value: string;
}