import {
    useState,
    BsCircleFill,
    FaPlaneDeparture,
} from "@/shared/deps";
import { useFilteredFlights } from "@/features/flights/hooks/useFilteredFlights";

import "@/assets/css/Chart.css";
import { useFlights } from "@/features/flights/hooks/useFlights";
import { useAirportLists } from "@/features/flights/hooks/useAirportLists";
import { AirlineBarChart, FlightList, FlightSearchFilter, FlightsTimeline, StatusPieChart } from "@/features";
import Pagination from "../components/Pagination";
import { statusColor } from "@/features/flights/utils/flight";
import { PAGE_SIZE, statuses } from "../constants";
import { useTranslation } from "react-i18next";

const Dashboard = () => {

    const { t } = useTranslation();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilters, setStatusFilters] =
        useState<string[]>(statuses);

    const [status, setStatus] = useState("");
    const [airline, setAirline] = useState("");

    const [flightDate, setFlightDate] = useState("");
    const [depAirport, setDepAirport] = useState("");
    const [arrAirport, setArrAirport] = useState("");

    const [page, setPage] = useState(1);

    //Fetching flights
    const { flights, total, loading, error } =
        useFlights({
            page,
            status,
            flightDate,
            depAirport,
            arrAirport,
            airline,
        });

    // Filtering Data
    const filteredFlights = useFilteredFlights({
        flights,
        searchTerm,
        status,
        statusFilters,
        airline,
        flightDate,
        depAirport,
        arrAirport,
    });

    const { departureAirports, arrivalAirports } =
        useAirportLists(flights);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const handleFilterChange = (setter: (v: any) => void) => {
        return (value: any) => {
            setter(value);
            setPage(1);
        };
    };

    return (
        <div style={{ padding: "16px" }}>
            <h1>{t("dashboard.title")}</h1>
            <div>
                <div className="chart-card">
                    <h3>{t("dashboard.status_title")}</h3>
                    <AirlineBarChart flights={flights} selectedAirline={airline} onSelect={setAirline} />
                </div>
            </div>
            <FlightSearchFilter
                onSearchChange={setSearchTerm}
                onStatusChange={handleFilterChange(setStatus)}
                onDateChange={handleFilterChange(setFlightDate)}
                onDepAirportChange={handleFilterChange(setDepAirport)}
                onArrAirportChange={handleFilterChange(setArrAirport)}
                departureAirports={departureAirports}
                arrivalAirports={arrivalAirports}
            />

            {loading && <p>{t("dashboard.loading_flight")}</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && !error && (
                <>
                    <FlightList flights={filteredFlights} />
                </>
            )}
            <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
            />
            <hr className="broad-divider" >
            </hr>
            <div className="Charts">
                <h2>{t("dashboard.flight_charts")}</h2>
                <div >
                    {status && <span><BsCircleFill className="status-active" style={{ color: statusColor(status) }} /> Status: {status}</span>}
                    {airline && <span style={{ marginLeft: 12 }}><FaPlaneDeparture /> Airline: {airline}</span>}
                </div>

                <div className="chart-card">
                    <h3>{t("dashboard.flight_status")}</h3>
                    <StatusPieChart
                        flights={flights}
                        selectedStatuses={statusFilters}
                        onToggleStatus={(s) =>
                            setStatusFilters((prev) =>
                                prev.includes(s)
                                    ? prev.filter((x) => x !== s)
                                    : [...prev, s]
                            )
                        } />
                </div>
                <div className="chart-card">
                    <h3> {t("dashboard.flight_timeline")}</h3>
                    <FlightsTimeline flights={flights} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;