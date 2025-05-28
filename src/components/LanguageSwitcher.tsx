import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";
import Flag from "react-world-flags";

const languages = [
  { code: "en", label: "EN", flag: "GB", title: "English" },
  { code: "pl", label: "PL", flag: "PL", title: "Polski" },
];

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{t("language")}</span>
      <div className={styles.group}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            title={lang.title}
            className={`${styles.option} ${
              currentLang === lang.code ? styles.active : ""
            }`}
            onClick={() => i18n.changeLanguage(lang.code)}
          >
            <Flag code={lang.flag} style={{ width: 30, height: 20 }} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
