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
            buttonStyle={{ color: "#fff", fontSize: "14px", background: "#28a745", borderRadius: "5px", padding: "10px 20px" }}
            declineButtonStyle={{ color: "#fff", fontSize: "14px", background: "#dc3545", borderRadius: "5px", padding: "10px 20px" }}
            expires={150}
        >
            Ми використовуємо файли cookie для покращення вашого досвіду. Приймаючи, ви погоджуєтесь із нашою{" "}
            <a href="/privacy-policy" style={{ color: "#FFD700", textDecoration: "underline" }}>
                політикою конфіденційності
            </a>
            .
        </CookieConsent>
    );
};

export default CookiePopup;