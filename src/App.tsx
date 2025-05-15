import "./App.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">{t("nav.MyPortfolio")}</div>
          <LanguageSwitcher />
        </div>
      </nav>
    </>
  );
}

export default App;
