import { Routes, Route, useParams } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePages from "./pages/HomePage"
import ProfilePages from "./pages/ProfilePages"
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import ContactPage from "./pages/ContactPage"
import Footer from "./pages/Footer";

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
        </Route>
      </Routes>

      { isLogin || isRegister ? null : <Footer className=" relative bottom-0" /> }
    
    </div>
  )
}

export default App;