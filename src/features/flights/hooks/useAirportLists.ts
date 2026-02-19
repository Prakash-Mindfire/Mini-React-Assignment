import { useMemo } from "@/shared/deps";
import type { AviationStackFlight } from "../types";

export function useAirportLists( flights: AviationStackFlight[] ) {
    return useMemo(() => {
        const departureAirports = Array.from(
            new Set(
                flights
                    .map((f) => f.departure.iata)
                    .filter(Boolean)
            )
        );

        const arrivalAirports = Array.from(
            new Set(
                flights
                    .map((f) => f.arrival.iata)
                    .filter(Boolean)
            )
        );

        return { departureAirports, arrivalAirports };
    }, [flights]);
}
