import { useEffect, useState } from "react";
import { fetchFlights } from "../services/aviationStack";
import FlightList from "../components/flights/FlightList";
import FlightSearchFilter from "../components/flights/FlightSearchFilter";
import type { AviationStackFlight } from "../types/aviation";

import FlightsTimeline from "../components/charts/FlightsTimeline";
import AirlineBarChart from "../components/charts/AirlineBarChart";
import StatusPieChart from "../components/charts/StatusPieChart";

import "../assets/css/Chart.css";
import { BsCircleFill } from "react-icons/bs";
import { statusColor } from "../utils/flight";
import { FaPlaneDeparture } from "react-icons/fa";
import { loadMockFlights, mapAviationStackResponse } from "../utils/flightMapper";
import Pagination from "../components/common/pagination";

const PAGE_SIZE = 100;

const Dashboard = () => {
    const [flights, setFlights] = useState<AviationStackFlight[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [filteredFlights, setFilteredFlights] = useState<AviationStackFlight[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const statuses = [
        "scheduled",
        "active",
        "landed",
        "cancelled",
        "delayed",
    ];
    const [statusFilters, setStatusFilters] = useState<string[]>(statuses);

    const [status, setStatus] = useState("");
    const [airline, setAirline] = useState("");

    const [flightDate, setFlightDate] = useState("");
    const [depAirport, setDepAirport] = useState("");
    const [arrAirport, setArrAirport] = useState("");

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const loadFlights = async () => {
        try {
            setLoading(true);
            setError(null);

            const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
            // console.log("Using mock data:", USE_MOCK);

            if (USE_MOCK) {
                const response = await loadMockFlights();
                setFlights(mapAviationStackResponse(response));
                setTotal(response.pagination?.total ?? response.data.length);
                return;
            }
            const response = await fetchFlights({
                flight_status: status || undefined,
                flight_date: flightDate || undefined,
                dep_iata: depAirport || undefined,
                arr_iata: arrAirport || undefined,
                airline_name: airline || undefined,
                limit: PAGE_SIZE,
                offset: (page - 1) * PAGE_SIZE,
            });

            setFlights(mapAviationStackResponse(response));
            setTotal(response.pagination?.total ?? 0);

        } catch (err) {
            console.log(err);
            setError("Failed to load flights");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFlights();
    }, []);

    useEffect(() => {
        loadFlights();
    }, [page, status, flightDate, depAirport, arrAirport, airline]);

    useEffect(() => {
        setPage(1);
    }, [status, flightDate, depAirport, arrAirport, airline]);

    useEffect(() => {
        let data = flights;

        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            data = data.filter((f) =>
                [
                    f.flight.iata,
                    f.flight.number,
                    f.airline.name,
                    f.departure.airport,
                    f.arrival.airport,
                    f.departure.iata,
                    f.arrival.iata,
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(q)
            );
        }

        if (status) {
            data = data.filter((f) => f.flight_status === status);
        }

        if (statusFilters.length) {
            data = data.filter((f) =>
                statusFilters.includes(f.flight_status)
            );
        }

        if (airline) {
            data = data.filter((f) => f.airline.name === airline);
        }

        if (flightDate) {
            data = data.filter(
                (f) =>
                    f.departure.scheduled?.slice(0, 10) === flightDate
            );
        }

        if (depAirport) {
            data = data.filter(
                (f) => f.departure.iata === depAirport
            );
        }

        if (arrAirport) {
            data = data.filter(
                (f) => f.arrival.iata === arrAirport
            );
        }

        setFilteredFlights(data);
    }, [searchTerm, status, airline, flightDate, depAirport, arrAirport, flights]);


    const departureAirports = Array.from(
        new Set(flights.map((f) => f.departure.iata).filter(Boolean))
    );

    const arrivalAirports = Array.from(
        new Set(flights.map((f) => f.arrival.iata).filter(Boolean))
    );

    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <div style={{ padding: "16px" }}>
            <h1>Flight Status Dashboard</h1>

            <FlightSearchFilter
                onSearchChange={setSearchTerm}
                onStatusChange={setStatus}
                onDateChange={setFlightDate}
                onDepAirportChange={setDepAirport}
                onArrAirportChange={setArrAirport}
                departureAirports={departureAirports}
                arrivalAirports={arrivalAirports}
            />

            {loading && <p>Loading flights...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

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
            <hr
                className="mt-3"
                style={{
                    margin: 25,
                    borderWidth: 10,
                    borderStyle: "solid",
                    borderColor: "#fff",
                    borderRadius: 10
                }}>
            </hr>
            <div className="Charts">
                <h2>Flight Charts</h2>
                <div style={{ marginBottom: 8 }}>
                    {status && <span><BsCircleFill className="status-active" style={{ color: statusColor(status) }} /> Status: {status}</span>}
                    {airline && <span style={{ marginLeft: 12 }}><FaPlaneDeparture /> Airline: {airline}</span>}
                </div>

                <div className="chart-card">
                    <h3>Flight Status</h3>
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
                    <h3>Airline Status</h3>
                    <AirlineBarChart flights={flights} selectedAirline={airline} onSelect={setAirline} />
                </div>

                <div className="chart-card">
                    <h3>Flight Timeline</h3>
                    <FlightsTimeline flights={flights} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
