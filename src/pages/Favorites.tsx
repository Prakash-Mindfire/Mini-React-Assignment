import FlightList from "../components/flights/FlightList";
import { useFavorites } from "../context/FavoritesContext";
import { MdFavorite } from "react-icons/md";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div style={{ padding: 16 }}>
      <h1><MdFavorite /> Favorite Flights</h1>

      {favorites.length === 0 ? (
        <p>No favorite flights yet.</p>
      ) : (
        <FlightList flights={favorites} />
      )}
    </div>
  );
};

export default Favorites;
