# CookiePopup

Компонент `CookiePopup` відображає спливаюче вікно для згоди користувача на використання файлів cookie згідно з GDPR.

## Використання

```jsx
import React from "react";
import CookiePopup from "./components/CookiePopup";

const App = () => {
    return (
        <div>
            <CookiePopup />
        </div>
    );
};

export default App;