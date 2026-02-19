import type { AviationStackFlight } from "../flights/types";

export type FavoritesContextType = {
  favorites: AviationStackFlight[];
  toggleFavorite: (flight: AviationStackFlight) => void;
  isFavorite: (flightIata: string) => boolean;
};