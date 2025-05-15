import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="language-switcher">
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`language-btn ${currentLang === "en" ? "active" : ""}`}
      >
        EN
      </button>
      <button
        onClick={() => i18n.changeLanguage("pl")}
        className={`language-btn ${currentLang === "pl" ? "active" : ""}`}
      >
        PL
      </button>
    </div>
  );
};

export default LanguageSwitcher;
