import type { AviationStackFlight } from "../types";
import FlightCard from "./FlightCard";

interface Props {
  flights: AviationStackFlight[];
}

const FlightList = ({ flights }: Props) => {
  if (!flights.length) {
    return <p>No flights available</p>;
  }

  return (
    <div className="flight-list" style={{ marginTop: 16 }}>
      {flights.map((flight, index) => (
        
        <div key={`${index}-${flight.flight.iata}-${flight.flight_date}`} >
          <FlightCard key={`${flight.flight.iata}-${flight.flight_date}`} flight={flight} />
        </div>
        ))
      }
    </div>
  );
};

      export default FlightList;