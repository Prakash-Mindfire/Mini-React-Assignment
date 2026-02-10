import './assets/css/App.css';
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Favorites from "./pages/Favorites";
// import Dashboard from './pages/Dashboard';
// import FlightDetails from './pages/FlightDetails';
// import { ThemeProvider, useTheme } from './context/ThemeContext';
import "./assets/css/toast.css"
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
// import FlightDashboard from './pages/FlightDashboard';

export default function APP() {

  // const { dark, toggle } = useTheme();

  return (
      <ThemeProvider>
        <Header/>
        <Footer/>
      </ThemeProvider>
  )
}