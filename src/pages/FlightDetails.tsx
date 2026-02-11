import { useParams, Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

import InfoCard from "../components/flight/InfoCard";
import InfoRow from "../components/flight/InfoRow";
import StatusBadge from "../components/flight/StatusBadge";
import FlightTimeline from "../components/flight/FlightTimeline";
import MapPlaceholder from "../components/flight/MapPlaceholder";
import CommentsList from "../components/comment/CommentList";
import AirlineLogo from "../components/flight/AirlineLogo";
import CommentBox from "../components/comment/CommentBox";
import StatusTimeline from "../components/flight/StatusTimeline";

// import { loadMockFlights, mapAviationStackResponse } from "../utils/flightMapper";
// import { fetchFlights } from "../services/aviationStack";
import type { AviationStackFlight } from "../types/aviation";

import "../assets/css/FlightDetails.css";

export default function FlightDetails() {
    // const { iata, date } = useParams();

    const location = useLocation();

    const flight = location.state?.flight as AviationStackFlight | undefined;

    if (!flight) {
        return (
            <div style={{ padding: 16 }}>
                <Link to="/">
                    <FiArrowLeft /> Back
                </Link>
                <p>Flight data not available. Please return to dashboard.</p>
            </div>
        );
    }


    // const passedFlight = location.state?.flight as AviationStackFlight | undefined;
    // const [flight, setFlight] = useState<AviationStackFlight | null>(
    //     passedFlight ?? null
    // );
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    // const buildFlightQuery = () => {
    //     return {
    //         flight_iata: passedFlight?.flight.iata ?? iata,
    //         flight_number: passedFlight?.flight.number,
    //         flight_icao: passedFlight?.flight.icao,

    //         airline_iata: passedFlight?.airline.iata,
    //         airline_icao: passedFlight?.airline.icao,

    //         dep_iata: passedFlight?.departure.iata,
    //         arr_iata: passedFlight?.arrival.iata,

    //         dep_icao: passedFlight?.departure.icao,
    //         arr_icao: passedFlight?.arrival.icao,

    //         flight_date: passedFlight?.flight_date ?? date,

    //         min_delay_dep: passedFlight?.departure.delay ?? undefined,
    //         min_delay_arr: passedFlight?.arrival.delay ?? undefined,

    //         limit: 1,
    //     };
    // };

    // useEffect(() => {
    //     if (!iata || !date) return;

    //     if (passedFlight?.aircraft && passedFlight?.departure.actual) {
    //         setFlight(passedFlight);
    //         return;
    //     }

    //     const loadFlights = async () => {
    //         try {
    //             setLoading(true);
    //             setError(null);

    //             const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
    //             console.log("Using mock data:", USE_MOCK);

    //             if (USE_MOCK) {
    //                 const response = await loadMockFlights();
    //                 const flights = mapAviationStackResponse(response);

    //                 const found = flights.find(
    //                     (f) =>
    //                         f.flight.iata === iata &&
    //                         f.flight_date === date
    //                 ) ?? null;

    //                 setFlight(found);
    //             } else {
    //                 const params = buildFlightQuery();

    //                 const response = await fetchFlights(params);

    //                 const flights = mapAviationStackResponse(response);
    //                 console.log(flights);
    //                 setFlight(flights[0] ?? null);
    //             }

    //         } catch (err) {
    //             console.error(err);
    //             setError("Failed to load flight");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadFlights();
    // }, [iata, date]);

    // if (loading) return <p>Loading flight details...</p>;
    // if (error) return <p style={{ color: "red" }}>{error}</p>;
    // if (!flight) return <p>Flight not found</p>;

    return (
        <div style={{ padding: 16 }}>
            <Link to="/">
                <FiArrowLeft style={{ verticalAlign: "middle" }} /> Back
            </Link>

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
                <InfoRow label="Actual" value={renderDate(flight.departure.actual)} />
                <InfoRow label="Delay (min)" value={flight.departure.delay} />
            </InfoCard>

            <InfoCard title="Arrival">
                <InfoRow label="Airport" value={flight.arrival.airport} />
                <InfoRow label="Terminal" value={flight.arrival.terminal} />
                <InfoRow label="Gate" value={flight.arrival.gate} />
                <InfoRow label="Baggage" value={flight.arrival.baggage} />
                <InfoRow label="Scheduled" value={renderDate(flight.arrival.scheduled)} />
                <InfoRow label="Estimated" value={renderDate(flight.arrival.estimated)} />
                <InfoRow label="Actual" value={renderDate(flight.arrival.actual)} />
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

const renderDate = (value?: string | null) => {
    if (!value) return "—";
    return new Date(value).toLocaleString();
};
