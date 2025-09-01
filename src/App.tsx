import './App.css'
import {Register} from "./autentification/screens/Register.tsx";
import {Login} from "./autentification/screens/Login.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {AdminDashboard} from "./user/admin/screens/AdminDashboard.tsx";
import {UserDashboard} from "./user/user/screens/UserDashboard.tsx";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-dashboard" element={<AdminDashboard/>} />
                <Route path="/user-dashboard" element={<UserDashboard/>} />
            </Routes>
        </Router>
    </>
  )
}

export default App
