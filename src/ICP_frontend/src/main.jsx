import React from "react";
import ReactDOM from "react-dom/client";
import HomeRoute from "./Routes/HomeRoute";
import NoteRoute from "./Routes/NoteRoute";
import LandingRoute from "./Routes/LandingRoute";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { AuthProvider } from "./AuthContext";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <ParallaxProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<LandingRoute />} />
            <Route path="app" element={<HomeRoute />} />
            <Route path="note" element={<NoteRoute />} />
          </Routes>
        </Router>
      </ParallaxProvider>
    </AuthProvider>
);
