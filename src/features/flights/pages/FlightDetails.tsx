import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import type { AviationStackFlight } from "../types";
import { 
    AirlineLogo,
    FlightTimeline,
    InfoCard,
    MapPlaceholder,
    StatusBadge,
    StatusTimeline
} from "@/shared";
import { CommentBox, CommentsList } from "@/features/comments";
import { useTranslation } from "react-i18next";

import "@/assets/css/FlightDetails.css";
import "@/assets/css/InfoCard.css";

export default function FlightDetails() {

    const location = useLocation();
    const {t} = useTranslation();

    const flight = location.state?.flight as AviationStackFlight | undefined;

    if (!flight) {
        return (
            <div className="flight-details-container">
                <Link to="/">
                    <FiArrowLeft /> {t("flight.back")}
                </Link>
                <p> {t("flight.no_flights")}</p>
            </div>
        );
    }

    return (
        <div className="flight-details-container" >
            <Link to="/">
                <FiArrowLeft style={{ verticalAlign: "middle" }} /> {t("flight.back")}
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

            <InfoCard title= {t("dashboard.flight_status")}
                rows={[
                    { label: t("status.title"), value: flight.flight_status },
                    { label: t("dashboard.flight_date"), value: flight.flight_date },
                ]}
            />

            <InfoCard title="Flight Progress"
                rows={[
                    { label: "Status", value: flight.flight_status },
                    { label: "Flight Date", value: flight.flight_date },
                ]}
            />

            <InfoCard title="Flight Progress" rows={[]}>
                <StatusTimeline status={flight.flight_status} />
            </InfoCard>

            <InfoCard title="Departure"
                rows={[
                    { label: "Airport", value: flight.departure.airport },
                    { label: "Terminal", value: flight.departure.terminal },
                    { label: "Gate", value: flight.departure.gate },
                    { label: "Scheduled", value: renderDate(flight.departure.scheduled) },
                    { label: "Estimated", value: renderDate(flight.departure.estimated) },
                    { label: "Actual", value: renderDate(flight.departure.actual) },
                    { label: "Delay (min)", value: flight.departure.delay },
                ]} />

            <InfoCard title="Arrival"
                rows={[
                    { label: "Airport", value: flight.arrival.airport },
                    { label: "Terminal", value: flight.arrival.terminal },
                    { label: "Gate", value: flight.arrival.gate },
                    { label: "Scheduled", value: renderDate(flight.arrival.scheduled) },
                    { label: "Estimated", value: renderDate(flight.arrival.estimated) },
                    { label: "Actual", value: renderDate(flight.arrival.actual) },
                    { label: "Delay (min)", value: flight.arrival.delay },
                ]} />

            <InfoCard title="Aircraft"
                rows={[
                    { label: "Registration", value: flight.aircraft?.registration },
                    { label: "ICAO24", value: flight.aircraft?.icao24 },
                    { label: "IATA Type", value: flight.aircraft?.iata },
                    { label: "ICAO Type", value: flight.aircraft?.icao },
                ]} />

            <InfoCard title="Airline"
                rows={[
                    { label: "Name", value: flight.airline.name },
                    { label: "IATA", value: flight.airline.iata },
                    { label: "ICAO", value: flight.airline.icao },
                ]} />

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