import "./App.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import night from "./assets/images/night_sky.png";
import day from "./assets/images/day_sky.png";
import sakura from "./assets/images/sakura.png";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useTheme } from "./context/ThemeContext";
import SingleProject from "./components/SingleProject";
import shop1 from "./assets/images/shop1.webp";
import shop2 from "./assets/images/shop2.webp";
import shop3 from "./assets/images/shop3.webp";
import shop4 from "./assets/images/shop4.webp";

function App() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const shopImages = [shop1, shop2, shop3, shop4];
  const shopDescription = t("shop_description");
  const shopCallToAction = t("call_to_action");
  const shopLink = "https://catalog-deploy-barosz30s-projects.vercel.app/";

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
        <SingleProject
          photos={shopImages}
          description={shopDescription}
          callToAction={shopCallToAction}
          linkToProject={shopLink}
        />
        <div className="project-container">3</div>
      </div>
    </>
  );
}

export default App;
