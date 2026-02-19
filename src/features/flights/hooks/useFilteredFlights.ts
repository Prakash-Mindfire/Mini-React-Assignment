import { useMemo } from "@/shared/deps";
import type { AviationStackFlight } from "../types";

export function useFilteredFlights({
    flights,
    searchTerm,
    status,
    statusFilters,
    airline,
    flightDate,
    depAirport,
    arrAirport,
}: {
    flights: AviationStackFlight[];
    searchTerm: string;
    status: string;
    statusFilters: string[];
    airline: string;
    flightDate: string;
    depAirport: string;
    arrAirport: string;
}) {
    return useMemo(() => {
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

        return data;
    }, [
        flights,
        searchTerm,
        status,
        statusFilters,
        airline,
        flightDate,
        depAirport,
        arrAirport,
    ]);
}
