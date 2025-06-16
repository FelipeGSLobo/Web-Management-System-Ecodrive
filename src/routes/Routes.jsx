import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuthValue } from "../context/AuthContext";

// Pages
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home/Home"


const AppRoutes = () => {
    const user = getAuthValue();
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={!user ? <Register /> : <Navigate to={"/"} />}/>

        </Routes>
    )
};

export default AppRoutes;