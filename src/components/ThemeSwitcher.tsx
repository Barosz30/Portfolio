import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import styles from "./ThemeSwitcher.module.css";

const themes = [
  { id: "light", label: "☀️", title: "Light" },
  { id: "dark", label: "🌙", title: "Dark" },
  { id: "sakura", label: "🌸", title: "Sakura" },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{t("theme")}</span>
      <div className={styles.group}>
        {themes.map((t) => (
          <button
            key={t.id}
            className={`${styles.option} ${
              theme === t.id ? styles.active : ""
            }`}
            title={t.title}
            onClick={() => setTheme(t.id as typeof theme)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
