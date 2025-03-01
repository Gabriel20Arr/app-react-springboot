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
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/login");
        }
    }, [isAuthtenticated]);

    const onSubmit = handleSubmit(async (values) => {
        try {
            setLoading(true); // Activar loading
            await singup(values);
            
            setTimeout(() => {
              setLoading(false);
              navigate("/login"); // Redirigir después de 3s
            }, 3000);
            
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
    });

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Sección Izquierda: Información */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-green-700 text-white">
                    <h2 className="text-3xl font-bold mb-4">Únete a MateClub</h2>
                    <p className="text-lg text-center mb-4">
                        Aprende sobre la cultura del mate, comparte experiencias y encuentra los mejores productos.
                    </p>
                    <img src={mateImage} alt="Mate" className="w-40 h-40 rounded-full border-4 border-white" />
                </div>

                {/* Sección Derecha: Formulario */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <div className='flex items-center justify-center w-full h-24 mb-4'>
                        <img src={saludo} alt='Hola' className='h-12' />
                        <h1 className='text-3xl font-bold text-center ml-2 text-gray-800'>Registrarse</h1>
                    </div>
                    <form onSubmit={onSubmit} className='flex flex-col'>
                        {errorR?.data && <p className='w-full bg-red-600 text-white mb-2 p-2'>{errorR?.data}</p>}

                        <input type='text' placeholder='Nombre' {...register("nombre", { required: true })}
                            className='w-full text-black rounded-md mb-3 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                        {errors.nombre && <span className='text-red-600 font-bold mb-3'>El Nombre es requerido</span>}

                        <input type='text' placeholder='Nombre de Usuario' {...register("nombreUsuario", { required: true })}
                            className='w-full text-black rounded-md mb-3 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                        {errors.nombreUsuario && <span className='text-red-600 font-bold mb-3'>El Nombre de Usuario es requerido</span>}

                        <input type='email' placeholder='Email' {...register("email", { required: true })}
                            className='w-full text-black rounded-md mb-3 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                        {errors.email && <span className='text-red-600 font-bold mb-3'>El Email es requerido</span>}

                        <input type='password' placeholder='Contraseña' {...register("password", { required: true })}
                            className='w-full text-black rounded-md mb-3 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                        {errors.password && <span className='text-red-600 font-bold mb-3'>La contraseña es requerida</span>}

                        <select {...register("roles", { required: true })}
                            className='w-full text-black rounded-md mb-3 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        >
                            <option value="" hidden>Seleccionar Rol</option>
                            <option value="ROLE_USER">Usuario</option>
                            <option value="ROLE_ADMIN">Administrador</option>
                        </select>
                        {errors.roles && <span className='text-red-600 font-bold mb-3'>El Rol es requerido</span>}

                        <p className='text-right p-2 text-black'>¿Ya tienes cuenta? <Link to={"/login"} className='text-green-500 font-bold'>Iniciar sesión</Link></p>
                        
                        <button
                        type="submit"
                        className="flex justify-center items-center w-full h-10 text-white border-separate bg-green-600 rounded-md font-bold mt-2 disabled:bg-green-500"
                        disabled={loading}
                      >
                      {loading ? (<div className='w-full h-full'><span className={Style.loader}></span></div>) : "Registrarse"}
                      </button>
                      {/* Mostrar mensaje de carga */}
                      {loading && (
                        <div className="mt-4 text-center text-black">
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
