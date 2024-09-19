import { useForm } from 'react-hook-form';
import css from './Registrate.module.css'
import { requestLogin, responseLogin } from '../../../Models/User.model';
import axios from 'axios';
import { getUserInformations, guardarToken } from '../../../Utils/Tokens';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthorizationContext from '../../Authentication/AuthorizationContext';

export default function Registrate(){

    const navigate = useNavigate();
    const { updateUserInformations } = useContext(AuthorizationContext);
    const {register, handleSubmit} = useForm<FormData>() 


    const guardar = async (data:FormData) => {
        const request: requestLogin = {username: data.TxtUsuario, password: data.TxtPassword1}
        const respuesta = await axios.post<responseLogin>(`https://localhost:7190/api/usuarios/registrar`, request);
        guardarToken(respuesta.data.token);
        updateUserInformations(getUserInformations())
        navigate('/');
    }

    return(
        <div className={css["Contenido"]}>
            <h3>Registro Usuario</h3>
            <div className={css["Contenedorformulario"]}>
                <form onSubmit={handleSubmit(guardar)}>
                    <div className={css['Formulario']}>
                        <div className={css['LblUsuario']}>
                            <label htmlFor="TxtUsuario">Usuarios:</label>
                        </div>
                        <div className={css['TxtUsuario']}>
                            <input  type="text" {...register('TxtUsuario')} />
                        </div>

                        <div className={css['LblPassword1']}>
                            <label htmlFor="TxtPassword1">Password:</label>
                        </div>
                        <div className={css['TxtPassword1']}>
                            <input  type="password"   {...register('TxtPassword1')}/>
                        </div>

                        <div className={css['LblPassword2']}>
                            <label htmlFor="TxtPassword2">Password:</label>
                        </div>
                        <div className={css['TxtPassword2']}>
                            <input type="password"  {...register('TxtPassword2')} />
                        </div>
                        
                        <div className={css['Botones']}>
                            <button type='submit'>Enviar</button>
                            <button type='button' onClick={() => {navigate('/')}}>Cancelar</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

interface FormData{
    TxtUsuario: string;
    TxtPassword1: string;
    TxtPassword2: string;

}