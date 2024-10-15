import { Routes, Route } from "react-router-dom";
import Register from "./pages/register/register";
import Login from "./pages/login/login";


const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/profile" element={<h1>Profile</h1>}/>
      <Route path="/" element={<h1>Home</h1>}/>
    </Routes>
  )
}

export default App;