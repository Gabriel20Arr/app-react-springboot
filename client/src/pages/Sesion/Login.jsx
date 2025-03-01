import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import saludo from '../../assets/img/saludo.png';
import saludo2 from '../../assets/img/saludo2.png';
import show from '../../assets/img/ojo.png';
import hidden from '../../assets/img/invisible.png';
import mateImage from '../../assets/img/img-mate-7.jpg';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { singin, isAuthtenticated, user, errorL } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthtenticated) {
            navigate('/');
        }
        if (user) {
            setValue('nombreUsuario', user.nombreUsuario);
            setValue('password', user.password);
        }
    }, [isAuthtenticated, user]);

    const onSubmit = handleSubmit(async (values) => {
        await singin(values);
        if (!errorL) {
            Swal.fire({
                html: `
                    <div style="display: flex; align-items: center;">
                        <img src="${saludo2}" style="width: 35px; height: 35px; margin-right: 10px;" />
                        <span>Hola, bienvenido ${values.nombreUsuario}!!</span>
                    </div>
                `,
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 4500,
                timerProgressBar: true,
                width: 'fit-content',
            });
        }
    });

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Sección Izquierda: Información */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-green-700 text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Bienvenido a Tu Mate</h2>
                    <p className="text-lg mb-4">
                        Descubre todo sobre la cultura del mate, comparte experiencias y encuentra los mejores productos.
                    </p>
                    <img src={mateImage} alt="Mate" className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white" />
                </div>

                {/* Sección Derecha: Formulario */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <div className='flex items-center justify-center w-full h-24 mb-4'>
                        <img src={saludo} alt='Hola' className='h-12' />
                        <h1 className='text-3xl font-bold text-center ml-2 text-gray-800'>Iniciar Sesión</h1>
                    </div>
                    <form onSubmit={onSubmit} className='flex flex-col'>
                        <input type='text' placeholder='Nombre de Usuario' {...register("nombreUsuario", { required: true })} 
                            className='w-full text-black rounded-md mb-3 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                        {errors.nombreUsuario && <span className='text-red-600 font-bold mb-3'>El nombre de usuario es requerido</span>}
                        
                        <div className='relative mb-3'>
                            <input type={showPassword ? 'text' : 'password'} placeholder='Contraseña' {...register("password", { required: true })} 
                                className='w-full text-black rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                            />
                            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-2 top-3'>
                                {showPassword ? <img src={show} className="h-5 w-5" /> : <img src={hidden} className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.password && <span className='text-red-600 font-bold mb-3'>La contraseña es requerida</span>}
                        <span className='text-red-600 font-bold mb-3'>{errorL?.response?.data?.mensaje}</span>

                        <p className='text-right p-2 text-black'>¿Aún no tienes cuenta? <Link to="/register" className='text-green-500 font-bold'>Crear cuenta</Link></p>
                        <button type='submit' className='w-full text-white bg-green-600 hover:bg-green-700 rounded-md p-2 font-bold my-2'>Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
