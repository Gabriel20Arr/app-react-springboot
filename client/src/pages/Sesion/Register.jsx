import React, { useEffect, useState } from 'react';
import Style  from "./Register.module.css"
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from "react-router-dom";
import saludo from "../../assets/img/saludo.png";
import mateImage from '../../assets/img/img-mate-7.jpg';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { singup, user, isAuthtenticated, errorR } = useAuthContext();
    const [ loading, setLoading ] = useState(false);
    const [ registroExitoso, setRegistroExitoso ] = useState(false);
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (values) => {
        try {
            setLoading(true);
            setRegistroExitoso(false);
            
            const result = await singup(values);
            
            // Verificar si hay errores después del intento de registro
            if (errorR?.response?.data) {
                setLoading(false);
                return;
            }

            // Si no hay errores, proceder con el registro exitoso
            setRegistroExitoso(true);
            setTimeout(() => {
                setLoading(false);
                navigate("/login");
            }, 3000);
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            setRegistroExitoso(false);
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden">
                {/* Sección Izquierda: Información */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-green-700 text-white text-center">
                    <h2 className="text-4xl font-bold mb-6">Únete a MateClub</h2>
                    <p className="text-lg mb-8">
                        Aprende sobre la cultura del mate, comparte experiencias y encuentra los mejores productos.
                    </p>
                    <img src={mateImage} alt="Mate" className="w-48 h-48 rounded-full border-4 border-white object-cover" />
                </div>

                {/* Sección Derecha: Formulario */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <div className='flex items-center justify-center w-full mb-8'>
                        <img src={saludo} alt='Hola' className='h-14 w-14' />
                        <h1 className='text-4xl font-bold text-center ml-3 text-gray-800'>Registrarse</h1>
                    </div>
                    <form onSubmit={onSubmit} className='flex flex-col space-y-4'>
                        {errorR?.response?.data && (
                            <div className="text-center text-red-600 font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                                <p>{errorR.response.data}</p>
                            </div>
                        )}

                        <input type='text' placeholder='Nombre' {...register("nombre", { required: true })}
                            className='w-full text-black text-lg rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                        {errors.nombre && <span className='text-red-600 font-semibold'>El Nombre es requerido</span>}

                        <input type='text' placeholder='Nombre de Usuario' {...register("nombreUsuario", { required: true })}
                            className='w-full text-black text-lg rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                        {errors.nombreUsuario && <span className='text-red-600 font-semibold'>El Nombre de Usuario es requerido</span>}

                        <input type='email' placeholder='Email' {...register("email", { required: true })}
                            className='w-full text-black text-lg rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                        {errors.email && <span className='text-red-600 font-semibold'>El Email es requerido</span>}

                        <input type='password' placeholder='Contraseña' {...register("password", { required: true })}
                            className='w-full text-black text-lg rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                        {errors.password && <span className='text-red-600 font-semibold'>La contraseña es requerida</span>}

                        <select {...register("roles", { required: true })}
                            className='w-full text-black text-lg rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        >
                            <option value="" hidden>Seleccionar Rol</option>
                            <option value="ROLE_USER">Usuario</option>
                            <option value="ROLE_ADMIN">Administrador</option>
                        </select>
                        {errors.roles && <span className='text-red-600 font-semibold'>El Rol es requerido</span>}

                        <div className="relative flex items-center justify-center my-4">
                            <div className="absolute w-full border-t border-gray-300"></div>
                            <div className="relative bg-white px-4">
                                <span className="text-sm text-gray-500">O regístrate con</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {/* Implementar registro con Google */}}
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

                        <p className='text-base text-gray-700'>¿Ya tienes cuenta? <Link to="/login" className='text-green-600 font-bold hover:text-green-700'>Iniciar sesión</Link></p>
                        
                        <button
                            type="submit"
                            className="w-full text-white bg-green-600 hover:bg-green-700 rounded-lg py-3 px-4 text-lg font-bold transition duration-200 disabled:bg-green-500 disabled:cursor-not-allowed flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (<div className='w-6 h-6'><span className={Style.loader}></span></div>) : "Registrarse"}
                        </button>
                        
                        {registroExitoso && !errorR?.response?.data && (
                            <div className="text-center text-green-600 font-medium bg-green-50 p-3 rounded-lg border border-green-200">
                                <p>Registro exitoso, redirigiendo en 3s...</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
