import React from "react";
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
import PropTypes from "prop-types";

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
 * Компонент ForecastChart відображає графік прогнозу температури.
 * @component
 * @param {Object} props Властивості компонента.
 * @param {Object} props.data Об'єкт даних для побудови графіка.
 * @param {string[]} props.data.labels Масив підписів (час або дата).
 * @param {number[]} props.data.temperatures Масив температурних значень.
 * @returns {JSX.Element} JSX-розмітка компонента ForecastChart.
 */
const ForecastChart = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: "Температура (°C)",
                data: data.temperatures,
                borderColor: "rgba(75,192,192,1)",
                fill: false,
            },
        ],
    };

    return <Line data={chartData} />;
};

ForecastChart.propTypes = {
    data: PropTypes.shape({
        labels: PropTypes.arrayOf(PropTypes.string).isRequired,
        temperatures: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
};

export default ForecastChart;