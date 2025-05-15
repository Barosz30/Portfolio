import { useTheme } from "../context/ThemeContext";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.buttonGroup}>
      {["light", "dark", "sakura"].map((t) => (
        <button
          key={t}
          className={`${styles.button} ${theme === t ? styles.active : ""}`}
          onClick={() => setTheme(t as typeof theme)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
