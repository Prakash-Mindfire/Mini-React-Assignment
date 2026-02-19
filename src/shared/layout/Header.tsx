import { NavLink, FiMoon, FiSun } from "@/shared/deps";
import { useTheme } from "@/shared/context/ThemeContext";
import reactLogo from "@/assets/react.svg";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { dark, toggle } = useTheme();

  const { t } = useTranslation();

  return (
    <header className="app-header">
      <span>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </span>

      <nav className="nav-left" >
        <NavLink
          to="/" end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          {t("pages.dashboard")}
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          {t("pages.favorites")}
        </NavLink>
      </nav>

      <div className="nav-right">
        <button onClick={toggle}>
          {dark ? <><FiMoon /> {t("theme.dark")}</> : <><FiSun /> {t("theme.light")}</>}
        </button>
      </div>
    </header>
  );
}
