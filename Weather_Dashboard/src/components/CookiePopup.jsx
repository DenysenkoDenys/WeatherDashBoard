import React from "react";
import CookieConsent from "react-cookie-consent";

/**
 * Компонент CookiePopup відображає спливаюче вікно для згоди користувача на використання файлів cookie.
 * @component
 * @returns {JSX.Element} JSX-розмітка компонента CookiePopup.
 */

const CookiePopup = () => {
    return (
        <CookieConsent
            location="bottom"
            buttonText="Прийняти"
            declineButtonText="Відхилити"
            enableDeclineButton
            cookieName="userConsent"
            style={{ background: "#2B373B" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            declineButtonStyle={{ color: "#fff", fontSize: "13px", background: "#d9534f" }}
            expires={150}
        >
            Ми використовуємо файли cookie для покращення вашого досвіду. Приймаючи, ви погоджуєтесь із нашою{" "}
            <a href="/privacy-policy" style={{ color: "#FFD700" }}>
                політикою конфіденційності
            </a>
            .
        </CookieConsent>
    );
};

export default CookiePopup;