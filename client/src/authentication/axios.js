import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: "http://localhost:9090/",
    withCredentials: true
});

// Interceptor para añadir el token a todas las solicitudes
instance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token"); // Obtenemos el token de las cookies

        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Añadimos el token al encabezado
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
