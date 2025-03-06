import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext"; 
import { CiCircleMinus, CiCirclePlus  } from "react-icons/ci";
import ConsultaEnvio from "./ConsultaEnvio";

import img1 from "../assets/img/img-mate-7.jpg"
import img2 from "../assets/img/img-mate-5.jpg"
import img3 from "../assets/img/img-mate-6.jpg"
import img4 from "../assets/img/img-mate-4.jpeg"
import imgOCA from "../assets/img/logo-oca-ok.png"
import imgAndreani from "../assets/img/logo-andreani.png"

const images = [img1, img2, img3, img4];

const ProductoDetalle = () => {
  const { id } = useParams();
  const { getProduct } = useProductContext();
  const [producto, setProducto] = useState(null);
  const [stocks, setStocks] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [personalizado, setPersonalizado] = useState("No");
  const [mainImage, setMainImage] = useState(images[0]); 

  useEffect(() => {
    const fetchProducto = async () => {
      const data = await getProduct(id);
      setProducto(data);
    };
    fetchProducto();
  }, [id]);

  const handleStockPlus = () => {
    if (stocks < producto.stock) {
      setStocks(stocks + 1);
    }
  };

  const handleStockMinus = () => {
    if (stocks > 0) {
      setStocks(stocks - 1);
    }
  };


  return !producto ? (
    <div className="flex justify-center items-center min-h-screen text-2xl">
      <span className="loader">Cargando...</span>
    </div>
  ) : (
    <div className="px-10 py-24 bg-background min-h-screen w-full text-2xl font-sans text-black flex justify-center">
      {/* Sección Imagen Producto */}
      <div className="flex flex-col items-center">
        <img 
          src={mainImage} 
          alt="Imagen Principal" 
          className="h-[600px] w-[500px] border-2 border-gray-300 rounded-md"
        />
        <div className="w-[500px] h-auto flex justify-between mt-4">
          {images.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`Thumbnail ${index + 1}`} 
              className="h-28 w-28 border rounded-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        {/*MODAL de PERSONALIZAR */}
        {personalizado === "Si" && (<div className="mt-10 p-2 h-auto w-[500px] bg-gray-200 rounded-md ">
          <h3 className="font-semibold">PASO A PASO PARA MANDARNOS TU IDEA</h3>
          <ul className="mb-3">Paso 1: Realizar la compra.</ul>
          <ul className="mb-2">Paso 2: Escribinos al whatsapp mencionando tu número de orden.</ul>
          <ul>WHATSAPP DISEÑADOR: 353473773</ul>
          <br></br>
          <ul className="mb-2">1- Para iniciar la personalización y diseño de tu pedido, necesitamos tu numero de orden POR ESCRITO, que lo encontraras en el mail de confirmacion de compra, es un numeral y seguidos 5 dígitos.</ul>
          <ul className="mb-3">ej: Mi Numero de orden es 12345.</ul>
          <ul>2- ¡Pasemos al siguiente paso, la personalización! 🎨
            Te recomiendo, copiar esta parte del mensaje y reenviarmela con los datos:</ul>
          <li>⬆️Arriba:</li>
          <li>⬇️Abajo:</li>
          <li>⬅️Izquierda:</li>
          <li>➡️Derecha:</li>

          <br></br>
          <ul>Para facilitar el diseño también podes:
            ✅Enviarme una foto con una circunferencia y el diseño que te gustaría.</ul>
          
          <br></br>
          <ul>Explícame lo mejor posible! 😉</ul>
        </div>)}
        
        <p className="mt-10 p-2 h-auto w-[500px] bg-gray-200 rounded-md "> 
            <h3 className="font-semibold">¿TIENE GARANTÍA MI PRODUCTO?</h3>
            Si, otorgamos un mes de garantía por fallas de nuestro taller que impidan su uso. En caso de que suceda, verificaremos el problema y trataremos de resolverlo lo antes posible. No se aceptarán reclamos de mates curados. El trabajo en nuestros mates es 100% artesanal, en el que se trata de lograr la perfección, siempre teniendo en cuenta que es realizado a mano y no por ninguna máquina. Si esta situación ocurre, te invitamos a comunicarte a nuestro whatsapp adjuntando detalles del problema, lo verificaremos e intentaremos resolverlo lo antes posible.
        </p>
      </div>
      
      {/* Sección para datos */}
      <div className="ml-10">
        <h1 className="font-heading font-semibold text-4xl mb-4">{producto.nombre}</h1>
        
        <p className="text-price text-xl font-semibold">${producto.precio - (producto.precio * 0.15)} Transferencia o depósito bancario</p>
        <p className="text-text text-xl font-semibold mb-4">${producto.precio}</p>
        
        <p className="font-sans text-textMuted text-xl mb-5">{producto.descripcion}</p>
        
        <p className="w-fit font-heading font-bold text-xl text-white bg-green-500 p-1">Envío gratis en compras superiores a $80.000</p>
        
        <div className="my-5 flex gap-5 text-xl font-sans">
          <div className="flex flex-col">
            <h3>Personalizado</h3>
            <select 
                className="border border-textMuted rounded-lg p-1 w-32"
                value={personalizado}
                onChange={(e) => setPersonalizado(e.target.value)}
            >
              <option>No</option>
              <option>Si</option>
            </select>
          </div>
          <div className="flex flex-col">
            <h3>Bombilla</h3>
            <select className="border border-textMuted rounded-lg p-1 w-32">
              <option>No</option>
              <option>Pico loro con filtro</option>
              <option>Bombillón de alpaca</option>
            </select>
          </div>
          <div className="flex flex-col">
            <h3>Caja</h3>
            <select className="border border-textMuted rounded-lg p-1 w-28">
              <option>No</option>
              <option>Caja de regalo (Negra)</option>
              <option>Caja básica (Marrón)</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-start items-center w-full h-auto mt-10">
          <p className="font-sans text-textMuted font-semibold text-xl mr-8">
            Stock disponible: <span className="text-black">{producto.stock}</span>
          </p>
        </div>

        <div className="flex justify-start gap-5 mt-4">
          <div className="h-12 w-32 p-3 font-semibold font-heading text-black text-xl border border-textMuted rounded-2xl flex items-center justify-between">
            <button 
              onClick={handleStockMinus} 
              disabled={stocks === 0}
              className={`border border-text rounded-full p-1 w-7 h-7 flex items-center justify-center hover:bg-gray-200 ${stocks === 0 ? "bg-gray-300 opacity-50 cursor-not-allowed" : "bg-gray-300"}`}
            >
              -
            </button>
            <span>{stocks}</span>
            <button 
              onClick={handleStockPlus} 
              disabled={stocks >= producto.stock}
              className={`border border-text rounded-full p-1 w-7 h-7 flex items-center justify-center hover:bg-gray-200 ${stocks >= producto.stock ? "bg-gray-300 opacity-50 cursor-not-allowed" : "bg-gray-300"}`}
            >
              +
            </button>
          </div>

          <button 
            className={`h-12 w-fit p-3 font-semibold font-heading text-white text-xl rounded-2xl ${stocks > 0 ? "bg-green-700 hover:bg-green-800" : "bg-gray-500 cursor-not-allowed"}`}
            disabled={stocks === 0}
          >
            Agregar al carrito
          </button>
        </div>

        <div className="mt-10">
          <p className="font-sans">
            <span className="text-price text-xl">15% de descuento </span>pagando con transferencia o depósito bancario.
          </p>
        </div>

        <div className="mt-10 text-xl">
          <span className="text-black font-heading">Medios de envío</span>
          <p className="font-sans text-textMuted">Envíos a todo el país por medio de OCA o Andreani</p>
          <div className="flex py-4">
            <img src={imgOCA} alt="OCA" className="h-14 w-auto"/>
            <img src={imgAndreani} alt="Andreani" className="h-14 w-auto"/>
          </div>

          {/* Sección de Código Postal */}
          <ConsultaEnvio />

          {/* Sección del local con acordeón */}
          <div className="mt-4 border-t pt-3 text-xl">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h3 className="text-lg font-semibold">Nuestro local</h3>
              {isOpen ? <CiCircleMinus /> : <CiCirclePlus />}
            </div>

            {isOpen && (
              <div className="mt-2 text-xl">
                <p className="text-textMuted text-lg">
                  <strong>• Tu Mate</strong> - Argentina, Córdoba, Calle 3, 891
                </p>
                <span className="text-green-600 font-semibold text-lg">Gratis</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
