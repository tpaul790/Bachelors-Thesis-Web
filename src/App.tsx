import './App.css'
import {Register} from "./autentification/screens/Register.tsx";
import {Login} from "./autentification/screens/Login.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {AdminDashboard} from "./user/admin/screens/AdminDashboard.tsx";
import {UserDashboard} from "./user/user/screens/UserDashboard.tsx";
import {Profile} from "./user/user-admin/screens/Profile.tsx";
import ProtectedRoute from "./security/ProtectedRoute.tsx";
import {UserRole} from "./user/dto/UserDtos.ts";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-dashboard" element={
                    <ProtectedRoute
                        userRoles={[UserRole.ADMIN]}
                        child={<AdminDashboard/>}
                    />}
                />
                <Route path="/user-dashboard" element={
                    <ProtectedRoute
                        userRoles={[UserRole.USER]}
                        child={<UserDashboard/>}
                    />}
                />
                <Route path="/profile" element={
                    <ProtectedRoute
                        userRoles={[UserRole.ADMIN, UserRole.USER]}
                        child={<Profile/>}
                    />}
                />
            </Routes>
        </Router>
    </>
  )
}

export default App
