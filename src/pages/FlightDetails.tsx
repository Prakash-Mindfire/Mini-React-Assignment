import { useParams, Link } from "react-router-dom";
import { mockFlights } from "../mocks/mock_flights";
import InfoCard from "../components/flight/InfoCard";
import InfoRow from "../components/flight/InfoRow";
import '../assets/css/FlightDetails.css';
import StatusBadge from "../components/flight/StatusBadge";
import FlightTimeline from "../components/flight/FlightTimeline";
import MapPlaceholder from "../components/flight/MapPlaceholder";
import CommentsList from "../components/comment/CommentList";
import AirlineLogo from "../components/flight/AirlineLogo";
import CommentBox from "../components/comment/CommentBox";
import StatusTimeline from "../components/flight/StatusTimeline";
import { FiArrowLeft } from "react-icons/fi";

export default function FlightDetails() {
    const { iata, date } = useParams();

    const flight = mockFlights.find(
        (f) =>
            f.flight.iata === iata &&
            f.flight_date === date
    );

    if (!flight) {
        return <div>Flight not found</div>;
    }


    return (
        <div style={{ padding: 16 }}>
            <Link to="/"><FiArrowLeft style={{verticalAlign:"middle"}}/> Back</Link>

            <div className="route-header">
                <h1>
                    <AirlineLogo
                        iata={flight.airline.iata}
                        name={flight.airline.name}
                    />
                    {flight.airline.name} ({flight.flight.iata})
                </h1>
                <h2>
                    <FlightTimeline
                        departure={flight.departure.iata}
                        arrival={flight.arrival.iata}
                    />
                </h2>
                <StatusBadge status={flight.flight_status} />
            </div>

            <InfoCard title="Flight Status">
                <InfoRow label="Status" value={flight.flight_status} />
                <InfoRow label="Flight Date" value={flight.flight_date} />
            </InfoCard>

            <InfoCard title="Flight Progress">
                <StatusTimeline status={flight.flight_status} />
            </InfoCard>

            <InfoCard title="Departure">
                <InfoRow label="Airport" value={flight.departure.airport} />
                <InfoRow label="Terminal" value={flight.departure.terminal} />
                <InfoRow label="Gate" value={flight.departure.gate} />
                <InfoRow label="Scheduled" value={renderDate(flight.departure.scheduled)} />
                <InfoRow label="Estimated" value={renderDate(flight.departure.estimated)} />
                <InfoRow label="Actual" value={renderDate(flight.departure.actual ?? null)} />
                <InfoRow label="Delay (min)" value={flight.departure.delay} />
            </InfoCard>

            <InfoCard title="Arrival">
                <InfoRow label="Airport" value={flight.arrival.airport} />
                <InfoRow label="Terminal" value={flight.arrival.terminal} />
                <InfoRow label="Gate" value={flight.arrival.gate} />
                <InfoRow label="Baggage" value={flight.arrival.baggage} />
                <InfoRow label="Scheduled" value={renderDate(flight.arrival.scheduled)} />
                <InfoRow label="Estimated" value={renderDate(flight.arrival.estimated)} />
                <InfoRow label="Actual" value={renderDate(flight.arrival.actual ?? null)} />
                <InfoRow label="Delay (min)" value={flight.arrival.delay} />
            </InfoCard>

            <InfoCard title="Aircraft">
                <InfoRow label="Registration" value={flight.aircraft?.registration} />
                <InfoRow label="ICAO24" value={flight.aircraft?.icao24} />
                <InfoRow label="IATA Type" value={flight.aircraft?.iata} />
                <InfoRow label="ICAO Type" value={flight.aircraft?.icao} />
            </InfoCard>

            <InfoCard title="Airline">
                <InfoRow label="Name" value={flight.airline.name} />
                <InfoRow label="IATA" value={flight.airline.iata} />
                <InfoRow label="ICAO" value={flight.airline.icao} />
            </InfoCard>
            <hr />

            <MapPlaceholder />

            {/* <CommentBox flightId={flight.flight.iata} /> */}
            <CommentBox
                flightIata={flight.flight.iata}
                flightDate={flight.flight_date}
            />
            <CommentsList
                flightIata={flight.flight.iata}
                flightDate={flight.flight_date}
            />
        </div>
    );
}

const renderDate = (value: string | null) => {
    if (!value) return "—";
    return new Date(value).toLocaleString();
};