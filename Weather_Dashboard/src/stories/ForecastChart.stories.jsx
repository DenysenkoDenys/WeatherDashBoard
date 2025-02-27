import React from "react";
import ForecastChart from "../components/ForecastChart.jsx";

export default {
    title: "Components/ForecastChart",
    component: ForecastChart,
};

const Template = (args) => <ForecastChart {...args} />;

export const ColdForecast = Template.bind({});
ColdForecast.args = {
    data: {
        labels: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
        temperatures: [10, 10, 9, 8, 8, 6],
    },
};

export const HotForecast = Template.bind({});
HotForecast.args = {
    data: {
        labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"],
        temperatures: [20, 21, 22, 23, 21, 21, 21, 22],
    },
};