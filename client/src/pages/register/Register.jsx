import React from 'react';
import { useForm } from 'react-hook-form';
import { registerRequest } from '../../authentication/auth';
import { Await } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit( async (values) => {
            const formattedValue = {
                ...values,
                roles: [values.roles]
            }
          const res = await registerRequest(formattedValue)
          console.log("RESPONSE: ", res.data.mensaje);
        })
    
  return (
      <div className='bg-zinc-800 max-w-md rounded-2xl p-2 mt-5'>
      <h1 className='w-full text-4xl font-bold p-3 text-center'>Register</h1>
      <form onSubmit={onSubmit}>
            <label className="text-white font-bold ">Nombre</label>
            <input type='text' name='nombre' 
                {...register("nombre", { required: true})}
                className='w-full  text-black max-w-md rounded-md mb-3 p-2'
            />

            <label className="text-white font-bold ">Nombre Usuario</label>
            <input type='text' name='nombreUsuario' 
                {...register("nombreUsuario", { required: true})}
                className='w-full  text-black max-w-md rounded-md mb-3 p-2'
            />
            
            <label className="text-white font-bold ">Email</label>
            <input type='email' name='email' 
                {...register("email", { required: true})}
                className='w-full text-black max-w-md rounded-md mb-3 p-2'
            />
            <label className="text-white font-bold ">Password</label>
            <input type='text' name='password' 
            {...register("password", { required: true})}
            className='w-full  text-black max-w-md rounded-md mb-3 p-2'
            />
            
            <label className="text-white font-bold ">Roles</label>
            <select
                {...register("roles", { required: true })}
                 className='w-full  text-black max-w-md rounded-md mb-3 p-2'
            >
                <option value="" hidden>Select</option>  
                <option value="ROLE_USER">User</option>  
                <option value="ROLE_ADMIN">Admin</option>
            </select>

            <button type='submit' className='w-full text-white border-separate bg-blue-600 rounded-md p-2 pr-4 pl-4 font-bold'>Register</button>
        </form>
    </div>
  )
}

export default Register