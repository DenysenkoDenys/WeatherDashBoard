import React from "react";
import PropTypes from "prop-types";
import "../style/WeatherDashboard.css";

/**
 * Компонент WeatherCard відображає інформацію про погоду для конкретного міста.
 * @component
 * @param {Object} props Властивості компонента.
 * @param {string} props.city Назва міста.
 * @param {number} props.temperature Температура в градусах Цельсія.
 * @param {string} props.description Опис погоди (наприклад, "сонячно").
 * @param {string} props.icon Іконка, що відображає стан погоди.
 * @returns {JSX.Element} JSX-розмітка компонента WeatherCard.
 */

const WeatherCard = ({ city, temperature, description, icon }) => {
    return (
        <div className="weather-card">
            <h3>{city}</h3>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
            <p>{temperature}°C</p>
            <p>{description}</p>
        </div>
    );
};

WeatherCard.propTypes = {
    city: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default WeatherCard;