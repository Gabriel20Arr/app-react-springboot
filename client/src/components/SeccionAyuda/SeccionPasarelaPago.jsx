import React from 'react'

const SeccionPasarelaPago = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-black p-6 mt-12">
      <h1 className="text-3xl font-bold text-center mb-6">Pasarela de Pago</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Métodos de Pago */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Métodos de Pago</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Tarjeta de crédito/débito (Visa, MasterCard, Amex)</li>
            <li>Transferencia bancaria</li>
            <li>Pago en efectivo (Rapipago, Pago Fácil)</li>
            <li>PayPal y MercadoPago</li>
          </ul>
        </div>

        {/* Seguridad */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Seguridad</h2>
          <p>
            Nuestra pasarela de pago cumple con los más altos estándares de seguridad. Utilizamos encriptación SSL para proteger tus datos y trabajamos con plataformas certificadas.
          </p>
        </div>

        {/* Pasos para pagar */}
        <div className="bg-white p-6 shadow-md rounded-lg col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Pasos para realizar tu pago</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Selecciona tu producto y agrégalo al carrito.</li>
            <li>Ingresa tus datos de facturación y envío.</li>
            <li>Elige tu método de pago preferido.</li>
            <li>Confirma el pago y recibirás un correo con la confirmación.</li>
          </ol>
        </div>

        {/* Preguntas Frecuentes */}
        <div className="bg-white p-6 shadow-md rounded-lg col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Preguntas Frecuentes</h2>
          <details className="mb-3">
            <summary className="cursor-pointer font-medium">¿Cuánto tiempo tarda en procesarse mi pago?</summary>
            <p className="mt-2 text-gray-700">Los pagos con tarjeta son instantáneos, mientras que transferencias pueden demorar hasta 24 horas.</p>
          </details>
          <details className="mb-3">
            <summary className="cursor-pointer font-medium">¿Puedo pagar en cuotas?</summary>
            <p className="mt-2 text-gray-700">Sí, aceptamos pagos en cuotas sin interés con tarjetas seleccionadas.</p>
          </details>
        </div>

      </div>
    </div>
  );
}

export default SeccionPasarelaPago