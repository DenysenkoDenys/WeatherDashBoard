import React from "react";
import { Link } from "react-router-dom";
import "./style/NotFound.css";

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 - Сторінку не знайдено</h1>
            <p>Вибачте, такої сторінки не існує.</p>
            <Link to="/">🔙 Повернутися на головну</Link>
        </div>
    );
};

export default NotFound;
