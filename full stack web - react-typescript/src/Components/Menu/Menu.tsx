import { NavLink } from 'react-router-dom'
import css from './Menu.module.css'
import Authentication from '../Authentication/Auhentication'
import { logout } from '../../Utils/Tokens';
import { useContext } from 'react';
import AuthorizationContext from '../Authentication/AuthorizationContext';

export default function Menu() {

    const { updateUserInformations } = useContext(AuthorizationContext);

    return (
        <nav>
            <div className={css['option-container']}>
                <div className={css['option']}>
                    <NavLink to='/'>Inicio</NavLink>
                </div>

                <Authentication

                    authenticated={
                        <>

                            <div className={css['option']}>
                                <NavLink to='/info'>Info</NavLink>
                            </div>
                            <div className={css['separator']}></div>
                            <div className={css['option']}>
                                <div onClick={() => {
                                    logout();
                                    updateUserInformations([]);
                                }}>Salir</div>
                            </div>
                        </>

                    }
                    noAuthenticated={
                        <>
                            <div className={css['separator']}></div>
                            <div className={css['option']}>
                                <NavLink to='/indetificate'>Identifícate</NavLink>
                            </div>
                            <div className={css['option']}>
                                <NavLink to='/registrate'>Regístrate</NavLink>
                            </div>
                        </>
                    }

                />




            </div>
        </nav>
    )
}