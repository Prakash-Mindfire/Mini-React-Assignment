import { createContext, useContext, useEffect, useState } from "react";
import type { AviationStackFlight } from "../types/aviation";
import { useToast } from "./ToastContext";

type FavoritesContextType = {
  favorites: AviationStackFlight[];
  toggleFavorite: (flight: AviationStackFlight) => void;
  isFavorite: (flightIata: string) => boolean;
};

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

  // Load favorites
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (flight: AviationStackFlight) => {
    const flightId = flight.flight.iata;

    const exists = favorites.some(
      (f) => f.flight.iata === flightId
    );

    setFavorites((prev) =>
      exists
        ? prev.filter((f) => f.flight.iata !== flightId)
        : [...prev, flight]
    );

    showToast(
      exists
        ? "Removed from favorites"
        : "Added to favorites",
      exists ? "error" : "success",
      {
        id: `favorite-${flightId}`,
        action: exists
          ? undefined
          : {
              label: "Undo",
              onClick: () => toggleFavorite(flight),
            },
      }
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
