import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAuthContext }  from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import saludo from "../assets/img/saludo.png"
import saludo2 from "../assets/img/saludo2.png"
import show from "../assets/img/ojo.png"
import hidden from "../assets/img/invisible.png"

const Login = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const {  singin, isAuthtenticated, user, errorL } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(user);
        if(isAuthtenticated) {
          navigate("/")
        }

        // Si hay un usuario registrado, llenamos los campos automáticamente
        if (user) {
            setValue("nombreUsuario", user.nombreUsuario);
            setValue("password", user.password); 
        }

        errorL
    }, [isAuthtenticated, user])

    const onSubmit = handleSubmit( async (values) => {
        await singin(values);
        await errorL;
        if(errorL){
            return Swal.fire({
            html: `
                <div style="display: flex; align-items: center;">
                    <img src="${saludo2}" style="width: 35px; height: 35px; margin-right: 10px;" />
                    <span>Hola, bienvenido ${values.nombreUsuario}!!</span>
                </div>
            `,
            toast: true, // Hace que sea una alerta tipo toast
            position: 'bottom-end', 
            showConfirmButton: false, 
            timer: 4500, 
            timerProgressBar: true,
            width: 'fit-content', 
            customClass: {
                popup: 'swal-welcome', 
            }
        });
        }
    });
 
return (
    <div className='h-screen flex items-center justify-center max-w-md'>
    <form onSubmit={onSubmit} className='flex flex-col w-96 mx-auto bg-zinc-800 rounded-2xl p-3 pr-6 pl-6'>
        <div className='flex items-center justify-center w-full h-24'>
            <img src={saludo} alt='Hola' className='h-12'/>
            <h1 className='text-4xl font-bold text-center ml-2'>Iniciar sesion</h1>
        </div>
        <input type='text' name='nombreUsuario' placeholder='Nombre Usuario'
            {...register("nombreUsuario", { required: true})}
            className='w-full  text-black max-w-md rounded-md mb-3 p-2'
        />
        {errors.nombreUsuario && <span className='w-full text-red-600 font-bold mb-3'>El nombre Usuario es requerido</span>}
        
        <div className='relative mb-3'>
            <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Contraseña'
                {...register("password", { required: true })}
                className='w-full text-black max-w-md rounded-md p-2'
            />
            <button 
                type='button' 
                onClick={() => setShowPassword(!showPassword)} 
                className='absolute right-2 top-3'
            >
                {showPassword ? <img src={show}  className="h-5 w-5"/> : <img src={hidden} className="h-5 w-5"/>}
            </button>
        </div>
        {errors.password && <span className='w-full text-red-600 font-bold mb-3'>La contraseña es requerido</span>}
        <span className='w-full text-white font-bold mb-3'>{errorL?.response?.data?.mensaje}</span>

        <p className='w-full text-right p-2'>Aun no tienes cuenta? <Link to="/register" className='text-blue-500'>Crear cuenta</Link></p>
        <button type='submit' className='w-full text-white border-separate bg-blue-600 rounded-md p-2 font-bold my-2'>Login</button>
      </form>
  </div>
  )
}

export default Login