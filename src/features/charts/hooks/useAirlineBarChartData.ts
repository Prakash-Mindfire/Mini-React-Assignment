import { useMemo } from "@/shared/deps";
import type { AviationStackFlight } from "@/features/flights/types";
import type { AirlineData } from "../types";

export function useAirlineChartData( flights: AviationStackFlight[] ): AirlineData[] {
    return useMemo(() => {
        const grouped = flights.reduce< Record<string, AirlineData> >((acc, flight) => {
            const name = flight.airline?.name;
            if (!name) return acc;

            acc[name] ??= { name, count: 0 };
            acc[name].count++;

            return acc;
        }, {});

        return Object.values(grouped).sort(
            (a, b) => b.count - a.count
        );
    }, [flights]);
}