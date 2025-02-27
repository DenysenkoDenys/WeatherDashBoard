import React from "react";
import WeatherCard from "../components/WeatherCard.jsx";

export default {
    title: "Components/WeatherCard",
    component: WeatherCard,
};

const Template = (args) => <WeatherCard {...args} />;

export const Sunny = Template.bind({});
Sunny.args = {
    city: "Київ",
    temperature: 25,
    description: "Сонячно",
    icon: "01d",
};

export const Rainy = Template.bind({});
Rainy.args = {
    city: "Львів",
    temperature: 16,
    description: "Дощ",
    icon: "09d",
};
