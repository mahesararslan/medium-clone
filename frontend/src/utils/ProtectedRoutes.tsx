import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { useEffect } from "react";

const ProtectedRoutes = () => {
    const token = localStorage.getItem("token");

    if(!token) {
        return <Navigate to="/signin" />
    }

    // make a verification call for the token and if it's invalid, redirect to signin
    // useEffect(() => {

    // }, [token])

    return <div>
        <Navbar />
        <Outlet />   
    </div>
}

export default ProtectedRoutes