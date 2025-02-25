import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePages from "./pages/HomePage"
import ProfilePages from "./pages/ProfilePages"
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import ContactPage from "./pages/ContactPage"
import Footer from "./pages/Footer";
import SeccionEnvio from "./components/SeccionAyuda/SeccionEnvio";
import SeccionPasarelaPago from "./components/SeccionAyuda/SeccionPasarelaPago"
import SeccionSucursal from "./components/SeccionAyuda/SeccionSucursal"
import SeccionExperiencia from "./components/SeccionAyuda/SeccionExperiencia"

import ProductoDetalle from "./components/ProductoDetalle";

import { useLocation } from "react-router-dom";


const App = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login"
  const isRegister = location.pathname === "/register"
  return (
    <div  className="w-full min-h-screen flex flex-col items-center bg-gray-100">
      { isLogin || isRegister ? null : <Navbar /> }
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePages />}/>
        <Route path="/profile" element={<ProfilePages />}/>
        <Route path="/contact" element={<ContactPage />}/>
        // Componnetes de ayuda para el usuario 
        <Route path="/envio" element={< SeccionEnvio />}/>
        <Route path="/pasarela-pago" element={< SeccionPasarelaPago />}/>
        <Route path="/sucursal" element={< SeccionSucursal />}/>
        <Route path="/experiencia" element={< SeccionExperiencia />}/>
        <Route path="/producto-detalle/:id" element={< ProductoDetalle />}/>
        </Route>
      </Routes>

      { isLogin || isRegister ? null : <Footer className="relative bottom-0" /> }
    
    </div>
  )
}

export default App;