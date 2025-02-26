import React, { useState } from "react";
import { Line } from "react-chartjs-2";
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
import "./style/WeatherDashboard.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const WeatherDashboard = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [error, setError] = useState("");

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

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetchWeather();
        }
    };

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
                        <Line data={getChartData()} />

                    </div>
                </div>
            )}

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
        </div>
    );
};

export default WeatherDashboard;