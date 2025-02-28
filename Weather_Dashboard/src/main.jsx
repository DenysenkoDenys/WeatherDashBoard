import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherDashboard from "./pages/WeatherDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./style/index.css";
import CookiePopup from "./components/CookiePopup.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import LICENSE from "./pages/LICENSE.jsx";

const App = () => {
    return (
        <Router>
            <CookiePopup />
            <Routes>
                <Route path="/" element={<WeatherDashboard />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/license" element={<LICENSE />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
