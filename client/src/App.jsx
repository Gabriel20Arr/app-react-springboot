import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePages from "./pages/HomePage"
import ProfilePages from "./pages/ProfilePages"
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />}/>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePages />}/>
        <Route path="/profile" element={<ProfilePages />}/>
      </Route>
    </Routes>
  )
}

export default App;