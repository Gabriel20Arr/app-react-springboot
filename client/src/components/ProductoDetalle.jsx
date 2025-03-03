import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext"; 
import { CiCircleMinus, CiCirclePlus  } from "react-icons/ci";
import ConsultaEnvio from "./ConsultaEnvio";

import img from "../assets/img/img-mate-7.jpg"
import img1 from "../assets/img/img-mate-4.jpeg"
import img2 from "../assets/img/img-mate-5.jpg"
import img3 from "../assets/img/img-mate-6.jpg"
import imgOCA from "../assets/img/logo-oca-ok.png"
import imgAndreani from "../assets/img/logo-andreani.png"

const images = [img1, img2, img3, img2]


const ProductoDetalle = () => {
  const { id } = useParams();
  const { getProduct } = useProductContext(); // Suponiendo que tienes esta función en el contexto
  const [producto, setProducto] = useState(null);
  const [stock, setStock] = useState(2)
  const [codigoPostal, setCodigoPostal] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [mainImage, setMainImage] = useState(images[0]); // Imagen principal inicial

  useEffect(() => {
    const fetchProducto = async () => {
      const data = await getProduct(id);
      setProducto(data);
    };
    
    fetchProducto();

    }, [id]);


    const handleStockPlus = () => {
        if (stock >= 10) {
            alert("El máximo de stock es 10");
        } else {
            setStock(stock + 1);
        }
    };

    const handleStockMinus = () => {
        if (stock > 0) {
            setStock(stock - 1);
        } else {
            alert("El stock no puede ser negativo");
        }
    };

  return (
    !producto ? (
        <div className="flex justify-center items-center min-h-screen text-2xl">
            <span className="loader"> Cargando...</span>
        </div>
    ) : (
    <div className="px-10 py-24 bg-background min-h-screen w-full text-2xl font-sans text-black flex justify-center">
        {/*Seccion Imagen Producto*/}
        <div className="flex flex-col items-center">
        {/* Imagen Principal */}
        <img 
          src={mainImage} 
          alt="Imagen Principal" 
          className="h-[600px] w-[500px] border-2 border-gray-300 rounded-md"
        />
  
        {/* Miniaturas */}
        <div className="w-[500px] h-auto flex justify-between mt-4">
          {images.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`Thumbnail ${index + 1}`} 
              className="h-28 w-28 border rounded-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setMainImage(img)} // Al hacer clic, cambia la imagen principal
            />
          ))}
        </div>
      </div>
                
        {/*Seccion para datos*/}
        <div className="ml-10">
            <h1 className="font-heading font-semibold text-4xl mb-4">{producto.nombre}</h1>
            
            <p className="text-price text-xl font-semibold">${ producto.precio - (producto.precio * 0.15)} Transferencia o deposito bancario</p>
            <p className="text-text text-xl font-semibold mb-4">${producto.precio}</p>
            
            <p className="font-sans text-textMuted text-xl mb-5">{producto.descripcion}</p>
            
            <p className="w-fit font-heading font-bold text-xl text-white bg-green-500 p-1">Envio gratis en compras superiores a $80.000</p>
            
            <div className="my-5 flex gap-5 text-xl font-sans">
                <div className="flex flex-col">
                    <h3>Personalizado</h3>
                    <select className="border border-textMuted rounded-lg p-1 w-32">
                        <option>No</option>
                        <option>Si</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <h3>Bombilla</h3>
                    <select className="border border-textMuted rounded-lg p-1 w-32">
                        <option>No</option>
                        <option>Pico loro con filtro</option>
                        <option>Bombillon de alpaca</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <h3>Caja</h3>
                    <select className="border border-textMuted rounded-lg p-1 w-28">
                        <option>No</option>
                        <option>Caja de regalo (Negra)</option>
                        <option>Caja de basica (Marron)</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-start items-center w-full h-auto mt-10">
                <p className="font-sans text-textMuted font-semibold text-xl mr-8">Stock disponible: <span className="text-black">10</span></p>
            </div>

            <div className="flex justify-start gap-5 mt-4">
                <div className="h-12 w-32 p-3 font-semibold font-heading text-black text-xl border border-textMuted rounded-2xl flex items-center justify-between">
                    <button onClick={() => handleStockMinus()} className="border border-text rounded-full p-1 w-7 h-7 flex items-center justify-center hover:bg-gray-200 bg-gray-300">-</button>
                    <span>{stock}</span>
                    <button onClick={() => handleStockPlus()} className="border border-text rounded-full p-1 w-7 h-7 flex items-center justify-center hover:bg-gray-200 bg-gray-300">+</button>
                </div>

                <button className="h-12 w-fit p-3 font-semibold font-heading text-white text-xl rounded-2xl bg-green-700 hover:bg-green-800">Agregar al carrito</button>
            </div>

            <div className="mt-10">
                <p className="font-sans "><span className="text-price text-xl">15% de descuento </span>pagando con tranferencia o deposito bancario.</p>
            </div>

            <div className="mt-10 text-xl">
                <span className="text-black font-heading">Medio de envio </span>
                <p className="font-sans text-textMuted">Envios a todo el pais por medio de OCA o Andreani</p>
                <div className="flex py-4">
                    <img src={imgOCA} alt="OCA" className="h-14 w-auto"/>
                    <img src={imgAndreani} alt="Andreani" className="h-14 w-auto"/>
                </div>

                {/* Input y botón 
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Tu código postal"
                        value={codigoPostal}
                        onChange={(e) => setCodigoPostal(e.target.value)}
                        className="border rounded-md px-3 py-2 w-full text-sm focus:ring focus:ring-green-500"
                    />
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">
                        OK
                    </button>
                </div>*/}

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
                            <strong>• Tu Mate</strong> - Argentina, Cordoba
                            Calle 3, 891
                        </p>
                        <span className="text-green-600 font-semibold text-lg">Gratis</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    )
    );
};

export default ProductoDetalle;
