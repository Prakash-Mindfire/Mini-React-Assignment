import { MdFavorite } from "react-icons/md";
import { useFavorites } from "../context/FavoritesContext";
import { FlightList } from "@/features/flights";
import { useTranslation } from "react-i18next";

const Favorites = () => {
  const {t} = useTranslation();
  const { favorites } = useFavorites();

  return (
    <div className="favorite-container">
      <h1><MdFavorite /> {t("favorite.title")}</h1>

      {favorites.length === 0 ? (
        <p> {t("favorite.no_favorite_flights_yet")} </p>
      ) : (
        <FlightList flights={favorites} />
      )}
    </div>
  );
};

export default Favorites;
