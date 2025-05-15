import "./App.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import night from "./assets/images/night_sky.png";
import day from "./assets/images/day_sky.png";
import sakura from "./assets/images/sakura.png";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  let background;

  switch (theme) {
    case "dark":
      background = night;
      break;
    case "light":
      background = day;
      break;
    case "sakura":
      background = sakura;
      break;
    default:
      background = day;
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">{t("nav.MyPortfolio")}</div>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </nav>
      <div className="main" style={{ backgroundImage: `url(${background})` }}>
        1<div className="project-container">2</div>
        <div className="project-container">3</div>
      </div>
    </>
  );
}

export default App;
