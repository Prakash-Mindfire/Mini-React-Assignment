import { useMemo } from "@/shared/deps";
import type { AviationStackFlight } from "@/features/flights/types";
import type { TimelinePoint } from "../types";

export function useFlightsTimelineData(
    flights: AviationStackFlight[]
): TimelinePoint[] {
    return useMemo(() => {
        const grouped = flights.reduce<Record<string, TimelinePoint>>((acc, flight) => {
            if (!flight.departure?.scheduled) return acc;

            const hour = new Date( flight.departure.scheduled )
                .getHours()
                .toString()
                .padStart(2, "0");

            acc[hour] ??= { hour, count: 0 };
            acc[hour].count++;

            return acc;
        }, {});

        return Object.values(grouped).sort(
            (a, b) => Number(a.hour) - Number(b.hour)
        );
    }, [flights]);
}
