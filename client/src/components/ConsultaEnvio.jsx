import { useState } from "react";

export default function ConsultaEnvio({}) {
  const [codigoPostal, setCodigoPostal] = useState("");
  const [costoEnvio, setCostoEnvio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const consultarEnvio = async () => {
    if (!codigoPostal) {
      setError("Ingresa un código postal válido");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      // Simulación de una consulta a OCA (debes reemplazar con la API real)
    //   const response = await fetch(`https://api.oca.com.ar/envios?cp=${codigoPostal}`);
      const response = await fetch(`https://api.andreani.com/v1/cotizador/tarifas?cp=${codigoPostal}`);
      const data = await response.json();

      if (data.costo) {
        setCostoEnvio(data.costo);
      } else {
        setError("No se encontró información para ese código postal.");
      }
    } catch (error) {
      setError("Error al consultar el servicio de envíos.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md">
      {/* Input de Código Postal */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Tu código postal"
          value={codigoPostal}
          onChange={(e) => setCodigoPostal(e.target.value)}
          className="border rounded-md px-3 py-2 w-full text-sm focus:ring focus:ring-blue-500"
        />
        <button
          onClick={consultarEnvio}
          className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800 font-semibold"
        >
          OK
        </button>
      </div>

      {/* Mostrar errores */}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {/* Mostrar costo de envío */}
      {loading && <p className="text-gray-600 text-sm mt-2">Consultando...</p>}
      {costoEnvio !== null && !loading && (
        <p className="text-green-600 text-lg font-semibold mt-2">
          Costo de envío: ${costoEnvio}
        </p>
      )}
    </div>
  );
}
