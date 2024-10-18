import { Routes, Route, useParams } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePages from "./pages/HomePage"
import ProfilePages from "./pages/ProfilePages"
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/navbar";
import { useLocation } from "react-router-dom";
const App = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login"
  const isRegister = location.pathname === "/register"
  return (
    <div  className="w-full min-h-screen flex flex-col items-center bg-gray-100 overflow-y-auto">
    { isLogin || isRegister ? null : <Navbar /> }
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />}/>
      
      <Route element={<ProtectedRoute />}>
      <Route path="/" element={<HomePages />}/>
      <Route path="/profile" element={<ProfilePages />}/>
      </Route>
      </Routes>
    </div>
  )
}

export default App;