import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu/Menu';
import logo from './logo.png'
import usuarioimg from './usuario.png'
import Inicio from './Components/Pages/Inicio/Inicio';
import Registrate from './Components/Pages/Registrate/Registrate';
import Info from './Components/Pages/Info/Info';
import Identificate from './Components/Pages/Identificate/Identificate';
import AuthorizationContext, { userInformation } from './Components/Authentication/AuthorizationContext';
import { useEffect, useState } from 'react';
import { getUserInformations, leerToken } from './Utils/Tokens';



function App() {

  const [userInformations, setUserInformations] = useState<userInformation[]>([]);
  
  function updateUserInformations(userInformations: userInformation[]){
    setUserInformations(userInformations);
  }


  useEffect(() => {
    setUserInformations(getUserInformations());
  }, [])

  return (
    <div className="container" >
      <BrowserRouter>
      <AuthorizationContext.Provider value={{userInformations, updateUserInformations}}>
        <div className="header">
          <div className="logo">
            <img alt="logo" src={logo} width={100} height={100} />
          </div>
          <div className="titulo">WEB APP</div>
          <div className="usuario">
            <img src={usuarioimg} alt="usuario" width={68} height={68} />
            <div>{userInformations && userInformations.length>0 ? <>{leerToken("SystemName")}</> : <>Invitado</> }</div>
          </div>
        </div>
        <div className="navbar"><Menu /> </div>
        <div className="main">
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/info' element={<Info />} />
          <Route path='/indetificate' element={<Identificate />} />
          <Route path='/registrate' element={<Registrate />} />
        </Routes>
        </div>
        <div className="footer">© Ysaias Ceron. Todos los derechos son reservados..</div>
        </AuthorizationContext.Provider>
      </BrowserRouter>
    </div>

  );
}

export default App;
