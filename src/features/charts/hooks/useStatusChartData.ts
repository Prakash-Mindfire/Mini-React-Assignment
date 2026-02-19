import { useMemo } from "@/shared/deps";
import { STATUSES } from "../constants";
import type { AviationStackFlight } from "@/features/flights/types";
import type { StatusChartData } from "../types";

export function useStatusChartData(
    flights: AviationStackFlight[],
    selectedStatuses: string[]
): {
    data: StatusChartData[];
    statusCounts: Record<string, number>;
} {
    return useMemo(() => {
        const statusCounts = STATUSES.reduce<Record<string, number>>(
            (acc, status) => {
                acc[status] = flights.filter(
                    (f) => f.flight_status === status
                ).length;
                return acc;
            },
            {}
        );

        const data = STATUSES
            .filter((s) => selectedStatuses.includes(s))
            .map((status) => ({
                name: status,
                value: statusCounts[status],
            }))
            .filter((d) => d.value > 0);

        return { data, statusCounts };
    }, [flights, selectedStatuses]);
}