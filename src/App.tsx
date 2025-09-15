import './App.css'
import {Register} from "./autentification/screens/Register.tsx";
import {Login} from "./autentification/screens/Login.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard} from "./user/user-admin/screens/Dashboard.tsx";
import {Profile} from "./user/user-admin/screens/Profile.tsx";
import ProtectedRoute from "./security/ProtectedRoute.tsx";
import {UserRole} from "./user/dto/UserDtos.ts";
import {UserTeams} from "./team/screens/UserTeams.tsx";
import {AdminTeams} from "./team/screens/AdminTeams.tsx";
import {AdminProjects} from "./project/screens/AdminProjects.tsx";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={
                    <ProtectedRoute
                        userRoles={[UserRole.USER, UserRole.ADMIN]}
                        child={<Dashboard/>}
                    />}
                />

                <Route path="/teams" element={
                    <ProtectedRoute
                        userRoles={[UserRole.USER, UserRole.ADMIN]}
                        child={<UserTeams/>}
                    />}
                />

                <Route path="/admin-teams" element={
                    <ProtectedRoute
                        userRoles={[UserRole.ADMIN]}
                        child={<AdminTeams/>}
                    />}
                />

                <Route path="/profile" element={
                    <ProtectedRoute
                        userRoles={[UserRole.ADMIN, UserRole.USER]}
                        child={<Profile/>}
                    />}
                />

                <Route path="/projects" element={
                    <ProtectedRoute
                        userRoles={[UserRole.ADMIN]}
                        child={<AdminProjects/>}
                    />}
                />
            </Routes>
        </Router>
    </>
  )
}

export default App
