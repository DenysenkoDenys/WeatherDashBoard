# Weather Dashboard

Проєкт `Weather Dashboard` — це веб-додаток для відображення поточної погоди та прогнозу температури для обраних міст. Додаток використовує API OpenWeatherMap для отримання даних про погоду.

## Зміст

- [Вимоги](#вимоги)
- [Встановлення](#встановлення)
- [Використання](#використання)
- [Ліцензія](#ліцензія)
- [Авторство](#авторство)

---

## Вимоги

Перед початком роботи переконайтеся, що у вас встановлені:

- [Node.js](https://nodejs.org/) (версія 16 або вище)
- [npm](https://www.npmjs.com/)

---
## Встановлення

1. Клонуйте репозиторій: 
```bash
   git clone https://github.com/DenysenkoDenys/WeatherDashBoard.git
```
2. Перейдіть до директорії проєкту:
 ```bash
cd Weather-dashboard
```
3. Встановіть залежності:
 ```bash
npm install чи npm i
```
## Використання

### Запуск локального сервера
Для запуску проєкту в режимі розробки виконайте команду:

1.Перейдіть до директорії з сервером
 ```bash
cd server
```

2. Та запустіть сервер
 ```bash
node Server.js  
```
Якщо при запуску серверу виникли помилки можете використати команду нижче
 ```bash
 node --experimental-modules Server.js
```
### Запуск сайту

Знаходячись у корені проєкту введіть команду
 ```bash
npm run dev
```
Та перейдіть за посиланням що надасть Вам Vite 

## Ліцензія

Цей проєкт розповсюджується під ліцензією `MIT`. Детальніше дивіться у файлі [LICENSE](Weather_Dashboard/licenses.json).

## Авторство
*Weather Dashboard* розроблено та підтримується Денисенком Денисом ІПЗ-22-4

GitHub: https://github.com/DenysenkoDenys

Email: 
```
ipz224_ddo@student.ztu.edu.ua
```
## Посилання

- [Storybook](Weather_Dashboard/src/stories/ForecastChart.stories.jsx)
- [JSDoc](Weather_Dashboard/docs/index.html)
- [Swagger API](Weather_Dashboard/server/swagger.json)
