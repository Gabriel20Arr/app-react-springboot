import { createContext, useContext, useState } from "react";
import { productRequest, createProductRequest, productsRequest, deleteProductRequest, actualizarProductRequest } from "../authentication/product"
import Cookies  from "js-cookie"

export const ProductContext = createContext();
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if(!context) {
        throw new Error("useProduct tiene que estar dentro de un provider");
    }

    return context;
}


export function ProductProvider({children}) {
    const [product, setProduct] = useState([])
    const [idProduct, setIdProduct] = useState([])

    const createProduct = async (producto) => {
        // console.log("responce01: ", producto);
        const res = await createProductRequest(producto);
    }

    const getProducts = async() => {
        const token = Cookies.get("token");
        const res = await productsRequest(token);
        setProduct(res.data)
        // console.log("getPorducts: ", res);  
    }

    const getProduct = async (id) => {
        try {
          const res = await productRequest(id);  // Hacemos la petición
          setIdProduct(res.data);  // Actualizamos el estado si es necesario
          return res.data;  // Devolvemos los datos para que puedan ser utilizados
        } catch (error) {
          console.error("Error al obtener el producto:", error);
          return null;  // O algún valor por defecto en caso de error
        }
      };
      

    // Función para eliminar un producto
    const deleteProduct = async (id) => {
        try {
            await deleteProductRequest(id);
            // Actualiza la lista de productos después de la eliminación
            await setProduct(product);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }

    const actualizarProduct = async (producto) => {
        try {
            await actualizarProductRequest(producto);
            // Actualiza la lista de productos después de la eliminación
            // await setProduct(product);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    }
    
    return(
        <ProductContext.Provider value={{
            product,
            createProduct,
            getProducts,
            getProduct,
            idProduct, 
            setIdProduct,
            deleteProduct,
            actualizarProduct
        }}>
            {children}
        </ProductContext.Provider>
    )
}