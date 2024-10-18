import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext }  from '../context/AuthContext';
import { useNavigate, Link } from "react-router-dom"

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { singup, user, isAuthtenticated } = useAuthContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(user) {
          navigate("/login")
        }
      }, [isAuthtenticated])

    const onSubmit = handleSubmit(async (values) => {
        try {
            await singup(values);
            navigate("/login");  // Redirige al login después de un registro exitoso
        } catch (error) {
            console.log(error);
        }
    });
    
  return (
      <div className='w-screen bg-zinc-800 max-w-md rounded-2xl p-2 mt-5'>
      <h1 className='w-full text-4xl font-bold p-3 text-center'>Register</h1>
      <form onSubmit={onSubmit} className='flex flex-col w-96 mx-auto pb-3 pt-2'>
            <input type='text' name='nombre' placeholder='Nombre' 
                {...register("nombre", { required: true})}
                className='w-full  text-black max-w-md rounded-md mb-3 p-2'
            />
            {errors.nombre && <span className='w-full text-red-600 font-bold mb-3'>El Nombre es requerido</span>}

            <input type='text' name='nombreUsuario' placeholder='Nombre Usuario'
                {...register("nombreUsuario", { required: true})}
                className='w-full  text-black max-w-md rounded-md mb-3 p-2'
            />
            {errors.nombreUsuario && <span className='w-full text-red-600 font-bold mb-3'>El nombre Usuario es requerido</span>}
            
            <input type='email' name='email' placeholder='Email'
                {...register("email", { required: true})}
                className='w-full text-black max-w-md rounded-md mb-3 p-2'
            />
            {errors.email && <span className='w-full text-red-600 font-bold mb-3'>El Email es requerido</span>}
            
            <input type='text' name='password' placeholder='Contraseña'
            {...register("password", { required: true})}
            className='w-full  text-black max-w-md rounded-md mb-3 p-2'
            />
            {errors.password && <span className='w-full text-red-600 font-bold mb-3'>La contraseña es requerido</span>}
            
            <select 
                {...register("roles", { required: true })}
                 className='w-full  text-black max-w-md rounded-md mb-3 p-2'
            >
                <option value="" hidden >Seleccionar Rol</option>  
                <option value="ROLE_USER">User</option>  
                <option value="ROLE_ADMIN">Admin</option>
            </select>
            {errors.roles && <span className='w-full text-red-600 font-bold mb-3'>El Rol es requerido</span>}

            <p className='w-full text-right'>Ya tienes cuenta? <Link to={"/login"} className='text-blue-500'>Iniciar sesion</Link></p>
            
            <button type='submit' className='w-full text-white border-separate bg-blue-600 rounded-md p-2 pr-4 pl-4 font-bold mt-2'>Register</button>
        </form>
    </div>
  )
}

export default Register