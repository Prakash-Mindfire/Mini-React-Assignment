import AirlineLogo from "@/shared/components/AirlineLogo";
import { FaRegCalendarAlt } from "react-icons/fa";
import { formatFlightDate } from "@/shared/utils/date";
import { CommentBox, CommentsList } from "@/features/comments";
import "@/assets/css/modal.css";

type Props = {
  flight: any;
  isOpen: boolean;
  onClose: () => void;
};

export default function FlightDetailsModal({ flight, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <button className="close-btn" onClick={onClose}>✕</button>

          <h2>
            <AirlineLogo
              iata={flight.airline.iata}
              name={flight.airline.name}
            />
            {flight.airline.name} ({flight.flight.iata})</h2>
          <h2>
            {flight.departure.iata} → {flight.arrival.iata}
          </h2>
          <h4>
            <p className="muted">
              <FaRegCalendarAlt/> {formatFlightDate(flight.departure.scheduled)}
            </p>
          </h4>

          <p><strong>Status:</strong> {flight.flight_status}</p>

          <div className="p-sm" style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '10%', paddingRight: '10%' }} >
            <div>
              <h3>Departure</h3>
              <p>
                {flight.departure.airport} ({flight.departure.iata})<br />
                Scheduled: {flight.departure.scheduled}
              </p>
            </div>
            <div>
              <h3>Arrival</h3>
              <p>
                {flight.arrival.airport} ({flight.arrival.iata})<br />
                Scheduled: {flight.arrival.scheduled}
              </p>
            </div>
          </div>
        </div>

        <div>
          {/* Comment Section */}
          <CommentBox flightIata={flight.flight.iata} flightDate={flight.flight_date} />
          <CommentsList
            flightIata={flight.flight.iata}
            flightDate={flight.flight_date}
          />
        </div>
      </div>
    </div>
  );
}
