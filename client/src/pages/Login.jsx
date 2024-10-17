import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAuthContext }  from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {  singin, user, isAuthtenticated } = useAuthContext();
    const navigate = useNavigate();

    // useEffect(() => {
            // async function isAuthenticated2(){
            //         if(isAuthtenticated) await navigate("/")
            //     }
            //     isAuthenticated2()
            // }, [isAuthtenticated])
            
    const onSubmit = handleSubmit( async (values) => {
        await singin(values)
    })
    
  return (
    <div className='w-screen bg-zinc-800 max-w-md rounded-2xl p-2 mt-5'>
    <h1 className='w-full text-4xl font-bold p-3 text-center'>Login</h1>
    <form onSubmit={onSubmit} className='flex flex-col w-96 mx-auto pb-3 pt-2'>
          <input type='text' name='nombreUsuario' placeholder='Nombre Usuario'
              {...register("nombreUsuario", { required: true})}
              className='w-full  text-black max-w-md rounded-md mb-3 p-2'
          />
          {errors.nombreUsuario && <span className='w-full text-red-600 font-bold mb-3'>El nombre Usuario es requerido</span>}
          
          <input type='text' name='password' placeholder='Contraseña'
          {...register("password", { required: true})}
          className='w-full  text-black max-w-md rounded-md mb-3 p-2'
          />
          {errors.password && <span className='w-full text-red-600 font-bold mb-3'>La contraseña es requerido</span>}

          <p className='w-full text-right p-2'>Aun no tienes cuenta? <Link to={"/register"} className='text-blue-500'>Crear cuenta</Link></p>
          <button type='submit' className='w-full text-white border-separate bg-blue-600 rounded-md p-2 pr-4 pl-4 font-bold mt-2'>Login</button>
      </form>
  </div>
  )
}

export default Login