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
                position: 'top-end',
                showConfirmButton: false,
                timer: 4500,
                timerProgressBar: true,
                width: 'fit-content',
            });
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden">
                {/* Sección Izquierda: Información */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-green-700 text-white text-center">
                
                    <h2 className="text-4xl font-bold mb-6">Bienvenido a Tu Mate</h2>
                    <p className="text-lg mb-8">
                        Descubre todo sobre la cultura del mate, comparte experiencias y encuentra los mejores productos.
                    </p>
                    <img src={mateImage} alt="Mate" className="w-48 h-48 rounded-full border-4 border-white object-cover" />
                </div>

                {/* Sección Derecha: Formulario */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <div className='flex items-center justify-center w-full mb-8'>
                        <img src={saludo} alt='Hola' className='h-14 w-14' />
                        <h1 className='text-4xl font-bold text-center ml-3 text-gray-800'>Iniciar Sesión</h1>
                    </div>
                    <form onSubmit={onSubmit} className='flex flex-col space-y-4'>
                        <input type='text' placeholder='Nombre de Usuario' {...register("nombreUsuario", { required: true })} 
                            className='w-full text-black text-lg rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                        {errors.nombreUsuario && <span className='text-red-600 font-semibold'>El nombre de usuario es requerido</span>}
                        
                        <div className='relative'>
                            <input type={showPassword ? 'text' : 'password'} placeholder='Contraseña' {...register("password", { required: true })} 
                                className='w-full text-black text-lg rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                            />
                            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                                {showPassword ? <img src={show} className="h-6 w-6" /> : <img src={hidden} className="h-6 w-6" />}
                            </button>
                        </div>
                        {errors.password && <span className='text-red-600 font-semibold'>La contraseña es requerida</span>}
                        <span className='text-red-600 font-semibold'>{errorL?.response?.data?.mensaje}</span>

                        <div className="relative flex items-center justify-center my-4">
                            <div className="absolute w-full border-t border-gray-300"></div>
                            <div className="relative bg-white px-4">
                                <span className="text-sm text-gray-500">O continúa con</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {/* Implementar inicio de sesión con Google */}}
                            className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 hover:bg-gray-50 transition duration-200"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span className="text-base font-medium">Continuar con Google</span>
                        </button>

                        <p className='text-base text-gray-700'>¿Aún no tienes cuenta? <Link to="/register" className='text-green-600 font-bold hover:text-green-700'>Crear cuenta</Link></p>
                        <button type='submit' className='w-full text-white bg-green-600 hover:bg-green-700 rounded-lg py-3 px-4 text-lg font-bold transition duration-200'>Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
