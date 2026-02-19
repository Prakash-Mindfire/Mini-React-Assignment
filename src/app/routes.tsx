import { Favorites, FlightDetails } from "@/features";
import Dashboard from "@/shared/pages/Dashboard";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/flight/:iata/:date" element={<FlightDetails />} />
    </Routes>
  );
}
