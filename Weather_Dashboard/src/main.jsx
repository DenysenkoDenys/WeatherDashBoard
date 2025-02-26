import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherDashboard from "./WeatherDashboard";
import NotFound from "./NotFound";
import "./style/index.css";
import CookiePopup from "./CookiePopup.jsx";
const App = () => {
    return (
        <Router>
            <CookiePopup />
            <Routes>
                <Route path="/" element={<WeatherDashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
