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
import gamesDatabase1 from "./assets/images/games_database1.webp";
import gamesDatabase2 from "./assets/images/games_database2.webp";
import gamesDatabase3 from "./assets/images/games_database3.webp";
import gamesDatabase4 from "./assets/images/games_database4.webp";
import bike1 from "./assets/images/Bike1.webp";
import bike2 from "./assets/images/Bike2.webp";
import bike3 from "./assets/images/Bike3.webp";
import bike4 from "./assets/images/Bike4.webp";
import gamesQR from "./assets/images/games_database_qr.webp";
import ChatbotWidget from "./components/ChatbotWidget";
import { useIsAtTop } from "./hooks/useIsAtTop";
import funfolio from "./assets/images/FunFolio.png";

function App() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isAtTop = useIsAtTop();

  const shopImages = [shop1, shop2, shop3, shop4];
  const shopDescription = t("shop_description");
  const shopCallToAction = t("call_to_action");
  const shopLink = "https://catalog-deploy-barosz30s-projects.vercel.app/";

  const gamesDatabaseImages = [
    gamesDatabase1,
    gamesDatabase2,
    gamesDatabase3,
    gamesDatabase4,
  ];
  const gamesDatabaseDescription = t("games_database_description");
  const gamesDatabaseImage = gamesQR;

  const bikeImages = [bike1, bike2, bike3, bike4];
  const bikeDescription = t("bike_description");
  const bikeLink = "https://barosz30.github.io/bikestore_layout/";

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
      <nav className={`navbar ${!isAtTop ? "hide-controls" : ""}`}>
        <div className={"navbar-container"}>
          {theme === "dark" ? (
            <div className={"dark-background"}>
              <img
                src={funfolio}
                alt="Mirosław Wandyk logo"
                className="navbar-logo-img"
              />
            </div>
          ) : (
            <img
              src={funfolio}
              alt="Mirosław Wandyk logo"
              className="navbar-logo-img"
            />
          )}

          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </nav>
      <div className="main" style={{ backgroundImage: `url(${background})` }}>
        <SingleProject
          photos={shopImages}
          description={shopDescription}
          callToAction={shopCallToAction}
          linkToProject={{ type: "url", value: shopLink }}
        />
        <SingleProject
          photos={gamesDatabaseImages}
          description={gamesDatabaseDescription}
          callToAction={shopCallToAction}
          linkToProject={{ type: "qr", value: gamesDatabaseImage }}
          orientation="vertical"
        />
        <SingleProject
          photos={bikeImages}
          description={bikeDescription}
          callToAction={shopCallToAction}
          linkToProject={{ type: "url", value: bikeLink }}
        />
      </div>
      <ChatbotWidget />
    </>
  );
}

export default App;
