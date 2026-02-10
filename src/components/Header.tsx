// components/layout/Header.tsx
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Dashboard from "../pages/Dashboard";
import Favorites from "../pages/Favorites";
import FlightDetails from "../pages/FlightDetails";
import { FiMoon, FiSun } from "react-icons/fi";

import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'

export default function Header() {

    const { dark, toggle } = useTheme();
    return (

        <BrowserRouter>
            <header className="app-header">
                <span>
                    {/* <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a> */}
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </span>
                <nav
                    className="nav-left"
                    style={{
                        padding: 12,
                        borderBottom: "1px solid #ddd",
                        marginBottom: 16,
                        display: "flex",
                        gap: 12,
                    }}
                >
                    <Link to="/">Dashboard</Link>
                    <Link to="/favorites">Favorites</Link>
                </nav>
                <div className="nav-right">
                    <span className="toggle-theme">
                        <button onClick={toggle}>
                            {dark ? (
                                <>
                                    <FiMoon /> Dark
                                </>
                            ) : (
                                <>
                                    <FiSun /> Light
                                </>
                            )}
                        </button>
                    </span>
                </div>
            </header>

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/flight/:iata/:date" element={<FlightDetails />} />
            </Routes>
        </BrowserRouter>

    );
}
