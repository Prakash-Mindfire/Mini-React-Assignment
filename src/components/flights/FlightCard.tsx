import { useState } from "react";
import { Link } from "react-router-dom";
import FlightDetailsModal from "./FlightDetailsModal";
import type { AviationStackFlight } from "../../types/aviation";
import { useFavorites } from "../../context/FavoritesContext";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { formatFlightDate } from "../../utils/date";
import AirlineLogo from "../flight/AirlineLogo";
import { FaRegCalendarAlt } from "react-icons/fa";
import { statusColor } from "../../utils/flight";

type Props = {
  flight: AviationStackFlight;
};

const FlightCard = ({ flight }: Props) => {

  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(flight.flight.iata);
  const [open, setOpen] = useState(false);

  return (

    <>
      <div
        key={`${flight.flight.iata}-${flight.flight_date}`}
        className="flight-card"
        onClick={() => setOpen(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="flight-card-header" >
          <AirlineLogo
            iata={flight.airline.iata}
            name={flight.airline.name}
          />
          <strong>
            {flight.airline.name} ({flight.flight.iata})
          </strong>

          <span
            style={{
              color: "white",
              background: statusColor(flight.flight_status),
              padding: "2px 8px",
              borderRadius: 12,
              fontSize: 12,
            }}
          >
            {flight.flight_status}

          </span>
          <span>
            {/* <FlightCard key={flight.flight.iata} flight={flight} /> */}

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(flight);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                color: fav ? "crimson" : "#555",
              }}
              aria-label="Toggle favorite"
            >
              {fav ? <MdFavorite /> : <MdFavoriteBorder />}
            </button>
          </span>
        </div>

        <div style={{ marginTop: 6 }}>
          {flight.departure.iata} → {flight.arrival.iata}
        </div>

        <div>
          <span className="flight-date">
            <FaRegCalendarAlt /> {formatFlightDate(flight.departure.scheduled)}
          </span>
        </div>

        <div style={{ fontSize: 13, marginTop: 4 }}>
          Departure:{" "}
          {new Date(flight.departure.scheduled).toLocaleTimeString()}
        </div>

        <div style={{ fontSize: 13 }}>
          Arrival:{" "}
          {new Date(flight.arrival.scheduled).toLocaleTimeString()}
        </div>

        {
          flight.departure.delay && (
            <div style={{ color: "orange", fontSize: 12 }}>
              Delay: {flight.departure.delay} mins
            </div>
          )
        }

        <Link
          className="flight-link"
          to={`/flight/${flight.flight.iata}/${flight.flight_date}`}
          state={{ flight }}
        >View Details</Link>
      </div>

      <FlightDetailsModal
        flight={flight}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default FlightCard;
