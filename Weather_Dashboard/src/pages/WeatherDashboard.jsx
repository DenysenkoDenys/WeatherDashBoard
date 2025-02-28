import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "../style/WeatherDashboard.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/**
 * Компонент WeatherDashboard для відображення інформації про погоду.
 * @component
 * @returns {JSX.Element} JSX-розмітка компоненту.
 */
const WeatherDashboard = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [error, setError] = useState("");

    /**
     * Отримує погодні дані для вказаного міста.
     * @async
     * @function fetchWeather
     * @throws {Error} Якщо місто не вказано або виникає помилка під час запиту.
     * @returns {Promise<void>} Нічого не повертає, але оновлює стан погоди.
     */
    const fetchWeather = async () => {
        if (!city) {
            setError("Будь ласка, введіть місто");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);

            if (!response.ok) {
                throw new Error("Не вдалося отримати погоду");
            }

            const data = await response.json();
            setWeather(data);
            setForecast(data.forecast || []);
            setHourlyForecast(data.hourlyForecast || []);
            setError("");
        } catch (err) {
            setError(err.message);
            setWeather(null);
            setForecast(null);
            setHourlyForecast([]);
        }
    };

    /**
     * Викликає fetchWeather() при натисканні клавіші Enter в полі введення.
     * @function handleKeyPress
     * @param {KeyboardEvent} e - Об'єкт події клавіатури.
     */
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetchWeather();
        }
    };

    /**
     * Перенаправляє користувача на сторінку політики конфіденційності.
     * @function handlePrivacyPolicyClick
     */
    const handlePrivacyPolicyClick = () => {
        window.location.href = "/privacy-policy";
    };

    /**
     * Перенаправляє користувача на сторінку ліцензії.
     * @function handleLICENSEClick
     */
    const handleLICENSEClick = () => {
        window.location.href = "/license";
    };
    /**
     * Видаляє кукі згоди користувача та перезавантажує сторінку.
     * @function handleUpdateCookiesClick
     */
    const handleUpdateCookiesClick = () => {
        document.cookie = "userConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    };

    /**
     * Генерує дані для графіка на основі прогнозу погоди.
     * @function getChartData
     * @returns {Object} Об'єкт з даними для графіка, включаючи labels та datasets.
     */
    const getChartData = () => {
        if (!hourlyForecast || !Array.isArray(hourlyForecast)) {
            console.log("hourlyForecast не валідний або не є масивом:", hourlyForecast);
            return {
                labels: [],
                datasets: [
                    {
                        label: "Температура (°C)",
                        data: [],
                        borderColor: "rgba(75,192,192,1)",
                        fill: false,
                    },
                ],
            };
        }

        console.log("hourlyForecast:", hourlyForecast);

        const labels = hourlyForecast.map(data => data.time);
        const temperatures = hourlyForecast.map(data => data.temperature);

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: "Температура (°C)",
                    data: temperatures,
                    borderColor: "rgba(75,192,192,1)",
                    fill: false,
                },
            ],
        };

        console.log("Chart Data:", chartData);

        return chartData;
    };

    return (
        <div className="container">
            <h1>Прогноз погоди</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Введіть місто"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={fetchWeather}>Отримати погоду</button>
            </div>

            {error && <p className="error">{error}</p>}
            <div className="weather-content">
                {weather && (
                    <div className="weather-info">
                        <h2>{weather.city}</h2>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                            alt={weather.description}
                        />
                        <p>Температура: {weather.temperature}°C</p>
                        <p>Опис: {weather.description}</p>
                        <p>Вологість: {weather.humidity}%</p>
                        <p>Швидкість вітру: {weather.windSpeed} м/с</p>
                    </div>
                )}

                {hourlyForecast.length > 0 && (
                    <div className="forecast-info">
                        <h2>Прогноз на наступні 9 годин</h2>
                        <div className="chart-container">
                            <Line data={getChartData()}/>
                        </div>
                    </div>
                )}
            </div>
            {forecast && (
                <div className="forecast-info">
                    <h2>Прогноз на 5 днів</h2>
                    <div className="daily-forecast">
                        {forecast.map((item, index) => (
                            <div key={index} className="day">
                                <p>{item.date}</p>
                                <img
                                    src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                    alt={item.description}
                                />
                                <p>Температура: {item.temperature}°C</p>
                                <p>Опис: {item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={handlePrivacyPolicyClick}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    padding: "10px 20px",
                    background: "#2B373B",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                }}
            >
                Переглянути політику конфіденційності
            </button>
            <button
                onClick={handleLICENSEClick}
                style={{
                    position: "fixed",
                    bottom: "120px",
                    right: "20px",
                    padding: "10px 20px",
                    background: "#2B373B",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                }}
            >
                Переглянути ліцензію
            </button>
            <button
                onClick={handleUpdateCookiesClick}
                style={{
                    position: "fixed",
                    bottom: "70px",
                    right: "20px",
                    padding: "10px 20px",
                    background: "#2B373B",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                }}
            >
                Оновити налаштування кукі
            </button>
        </div>
    );
};

export default WeatherDashboard;