import React from 'react'
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(values => {
        console.log(values);
    })}>

        <label>Nombre Usuario</label>
        <input type='text' name='nombreUsuario' 
            {...register("nombreUsuario", { required: true})}
        />
        
        <label>Email</label>
        <input type='email' name='email' 
            {...register("email", { required: true})}
        />

        <label>Password</label>
        <input type='text' name='password' 
            {...register("password", { required: true})}
        />

        <button type='submit'>Login</button>
    </form>
  )
}

export default Login