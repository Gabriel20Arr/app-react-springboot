import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, profileRequest } from "../authentication/auth"
import Cookies from "js-cookie"

// creamos el context
export const AuthContext = createContext();

// creamos funcion para usar el contexto 
export const useAuthContext = () => {
    const context =  useContext(AuthContext)
    if(!context) {
        throw new Error("useAuth tiene que estar dentro de un provider");
    }

    return context;
}
 
// creamos el provider
export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null); 
    const [ isAuthtenticated, setIsAuthtenticated ] = useState(false);
    const [ loading, setLoading ] = useState(true); 
    
    const singup = async ( user ) => {
        try {
            const formattedValue = {
                ...user,
                roles: [user.roles]
            }
            const res = await registerRequest(formattedValue)
            setUser(res.data)
            setIsAuthtenticated(true);
        } catch (error) {
            setIsAuthtenticated(false);
            setUser(null)
            console.log(error);
        }
    }

    const singin = async (user) => {
        try {
            const res = await loginRequest(user)
            Cookies.set("token", res.data);
            setUser(res.data)
            setIsAuthtenticated(true)
        } catch (error) {
            console.log(error);
            setIsAuthtenticated(false)
            setUser(null)
        }
    }

    const profile = async (token) => {
        const res = await profileRequest(token)
        setUser(res.data)
    }
    
    useEffect(() => {
        async function checkLogin() {
            const token = Cookies.get("token");  // Asegúrate de que el nombre de la cookie sea correcto
             if (!token) {
                 setIsAuthtenticated(false);
                 setLoading(false);
                 return;
             }
     
             try {
                 const res = await verifyTokenRequest(token);
                 if (res.status === 200) {
                     setIsAuthtenticated(true);
                     setUser(res.data);  // Puedes guardar más datos si es necesario
                 } else {
                     setIsAuthtenticated(false);
                 }
             } catch (error) {
                 console.log(error);
                 setIsAuthtenticated(false);
             } finally {
                 setLoading(false);
             }
         }
         checkLogin();
     }, []);
     


    return (
        <AuthContext.Provider 
            value={{
                singup, 
                user,
                isAuthtenticated,
                setIsAuthtenticated,
                loading,
                singin,
                profile
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
