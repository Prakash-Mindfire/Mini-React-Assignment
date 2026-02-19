import { createContext, useContext, useEffect, useState } from "../deps";
import type { FavoritesContextType } from "../types";
import type { AviationStackFlight } from "../../flights/types";
import { useToast } from "../../../shared/context/ToastContext";

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<AviationStackFlight[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (flight: AviationStackFlight) => {
    const flightId = flight?.flight?.iata;
    if (!flightId) return;

    const exists = favorites.some(
      (f) => f.flight.iata === flightId
    );

    setFavorites((prev) =>
      exists
        ? prev.filter((f) => f.flight.iata !== flightId)
        : [...prev, flight]
    );

    showToast(
      exists ? "Removed from favorites" : "Added to favorites",
      exists ? "error" : "success"
    );
  };

  const isFavorite = (flightIata: string) =>
    favorites.some((f) => f.flight.iata === flightIata);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
};
