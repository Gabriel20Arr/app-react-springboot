import React, { useRef } from 'react';
import emailjs from "@emailjs/browser";
import Swal from 'sweetalert2/dist/sweetalert2.js';

const ContactPage = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const name = form.current.user_name.value;
    const email = form.current.user_email.value;
    const message = form.current.message.value;

    if (!name || !email || !message) {
      Swal.fire({
        title: 'Alerta!',
        text: 'Completar todos los campos',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        title: 'Alerta!',
        text: 'Por favor, ingresa un correo electrónico válido',
        icon: 'warning',
        position: 'center',
        confirmButtonText: 'Ok'
      });
      return;
    }

    emailjs.sendForm('service_hg0hxay', 'template_b0jujif', form.current, '1LZEauZPTMLf39Fyv')
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire({
            text: 'Mensaje enviado correctamente.',
            icon: 'success',
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            width: 'fit-content',
            customClass: {
              popup: 'swal-welcome',
            }
          });
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contacto</h1>
        <p className="text-gray-600 text-center mb-8">
          ¡Estamos aquí para ayudarte! Contáctanos para más información.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de contacto */}
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
            <input
              type="text"
              name="user_name"
              placeholder="Nombre"
              className="border border-gray-300 bg-gray-50 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              name="user_email"
              placeholder="Correo electrónico"
              className="border border-gray-300 bg-gray-50 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Mensaje"
              name="message"
              className="border border-gray-300 bg-gray-50 rounded-md py-2 px-4 h-24 focus:outline-none focus:border-blue-500 resize-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Enviar Mensaje
            </button>
          </form>

          {/* Información de contacto */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md text-gray-800">
            <h2 className="text-xl font-semibold mb-4">Contáctanos</h2>
            <p className="mb-2">📞 <strong>Teléfono:</strong> +54 351 123 4567</p>
            <p className="mb-2">📧 <strong>Email:</strong> contacto@sucursal.com</p>
            <p className="mb-2">📱 <strong>WhatsApp:</strong> +54 9 351 987 6543</p>
            <p className="text-gray-600 mt-4">Nuestro equipo responderá tu consulta lo antes posible.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
