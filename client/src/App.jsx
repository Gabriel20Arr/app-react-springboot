import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Register from "./pages/Sesion/Register";
import Login from "./pages/Sesion/Login";
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
import ProductosPages from "./pages/ProductosPages";
import SobreNosotros from "./pages/SobreNosotros";
import ProductoDetalle from "./components/ProductoDetalle";
import DashboardAdmin from "./components/DashboardAdmin";
import ProductosPagesDash from "./components/ProductosPagesDash";

import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login"
  const isRegister = location.pathname === "/register"

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  
  return (
    <CartProvider>
      <div  className="w-full min-h-screen flex flex-col items-center bg-gray-100">
        { (isLogin || isRegister || isModalOpen) ? null : <Navbar /> }
        
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
          <Route path="/productos" element={< ProductosPages />}/>
          <Route path="/productos-dash" element={<ProductosPagesDash setIsModalOpen={setIsModalOpen} />} />
          <Route path="/producto-detalle/:id" element={< ProductoDetalle />}/>
          <Route path="/aboutMe" element={< SobreNosotros />}/>
          <Route path="/dash-admin" element={< DashboardAdmin />}/>
          </Route>
        </Routes>

        { isLogin || isRegister ? null : <Footer className="relative bottom-0" /> }
      
      </div>
    </CartProvider>
  )
}

export default App;