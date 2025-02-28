import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

const app = express();
const PORT = 5000;
const API_KEY = "e40784deb4efbf369e1c64d13aeefdcd";

app.use(cors());
const swaggerDocument = JSON.parse(fs.readFileSync("swagger.json", "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api/weather", async (req, res) => {
    let city = req.query.city;

    if (!city || typeof city !== "string") {
        return res.status(400).json({ error: "Місто має бути текстом і не може бути порожнім" });
    }

    city = encodeURIComponent(city.trim());

    try {
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ua`
        );

        if (!weatherResponse.ok) {
            return res.status(weatherResponse.status).json({ error: "Не вдалося отримати погоду для вказаного міста" });
        }

        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ua`
        );

        if (!forecastResponse.ok) {
            return res.status(forecastResponse.status).json({ error: "Не вдалося отримати прогноз для вказаного міста" });
        }

        const forecastData = await forecastResponse.json();

        const now = new Date();
        const startHour = now.getHours();
        const today = now.getDate();

        const hourlyForecastRaw = forecastData.list
            .filter(item => new Date(item.dt * 1000) > now)
            .map((item) => ({
                time: new Date(item.dt * 1000),
                temperature: Math.round(item.main.temp),
            }));

        const hourlyForecast = [];
        for (let i = 0; i < 9; i++) {
            const targetHour = (startHour + i) % 24;
            const before = hourlyForecastRaw.find(item => item.time.getHours() <= targetHour);
            const after = hourlyForecastRaw.find(item => item.time.getHours() > targetHour);

            let interpolatedTemp;
            if (before && after) {
                const ratio = (targetHour - before.time.getHours()) / (after.time.getHours() - before.time.getHours());
                interpolatedTemp = Math.round(before.temperature + ratio * (after.temperature - before.temperature));
            } else {
                interpolatedTemp = before ? before.temperature : after ? after.temperature : null;
            }

            hourlyForecast.push({
                time: `${targetHour}:00`,
                temperature: interpolatedTemp,
            });
        }

        const dailyForecastData = forecastData.list
            .map((item) => ({
                date: new Date(item.dt * 1000),
                temperature: Math.round(item.main.temp),
                description: item.weather[0].description,
                icon: item.weather[0].icon,
            }))
            .filter((item) => item.date.getDate() !== today);

        const dailyForecast = [];
        const addedDates = new Set();

        for (let item of dailyForecastData) {
            const dateStr = item.date.toLocaleDateString("uk-UA");
            if (!addedDates.has(dateStr)) {
                dailyForecast.push({
                    date: dateStr,
                    temperature: item.temperature,
                    description: item.description,
                    icon: item.icon,
                });
                addedDates.add(dateStr);
            }
            if (dailyForecast.length === 5) break;
        }

        res.json({
            city: weatherData.name,
            temperature: Math.round(weatherData.main.temp),
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            icon: weatherData.weather[0].icon,
            hourlyForecast: hourlyForecast,
            forecast: dailyForecast,
        });
    } catch (error) {
        console.error("Помилка сервера:", error);
        res.status(500).json({ error: "Внутрішня помилка сервера" });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
