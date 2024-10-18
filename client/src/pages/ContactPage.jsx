import React, { useRef } from 'react'
import emailjs from "@emailjs/browser"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const ContactPage = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    const name = form.current.user_name.value;
    const email = form.current.user_email.value;
    const message = form.current.message.value;

    // Realizar validaciones
    if (!name || !email || !message) {
      Swal.fire({
        title: 'Alerta!',
        text: 'Completar todos los campos',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      return;
    }

    // Validar el formato del correo electrónico usando una expresión regular simple
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
            title: 'Alerta!',
            text: 'Por favor, ingresa un correo electrónico válido',
            icon: 'warning',
            position: 'center',
            confirmButtonText: 'Ok'
          })
      return;
    }

    emailjs
      .sendForm('service_hg0hxay', 'template_b0jujif', form.current, '1LZEauZPTMLf39Fyv')
      .then(
        (result) => {
          console.log(result.text);
          
          Swal.fire({
            title: 'Exito',
            text: 'Enviado con exito',
            icon: 'success',
            confirmButtonText: 'Ok'
          })

          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="border-2 border-gray-300 h-full w-full p-6 bg-gray-50 rounded-lg shadow-md">
    <form ref={form} onSubmit={sendEmail} className="flex flex-col items-center gap-4 border-2 border-gray-300 bg-white p-6 rounded-lg w-full max-w-lg mx-auto shadow-lg">
      <span className="text-2xl font-bold text-gray-700">Form Help</span>
      <span className="text-lg font-semibold text-gray-500 text-center">Hear more about how we can help</span>
      <input
        type='text'
        name='user_name'
        placeholder='Name'
        className="border border-gray-300 bg-slate-200 rounded-md w-full py-2 px-4 focus:outline-none focus:border-blue-500"
      />
      <input
        type='text'
        name='user_email'
        placeholder='Email'
        className="border border-gray-300 bg-slate-200 rounded-md w-full py-2 px-4 focus:outline-none focus:border-blue-500"
      />
      <textarea
        placeholder='Message'
        name="message"
        className="border border-gray-300 bg-slate-200 rounded-md w-full py-2 px-4 h-24 focus:outline-none focus:border-blue-500 resize-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-600 transition duration-200 ease-in-out"
      >
        Send
      </button>
    </form>
  </div>
  
  )
}

export default ContactPage;