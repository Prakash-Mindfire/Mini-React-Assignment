import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { AviationStackFlight } from "../../types/aviation";

type Props = {
    flights: AviationStackFlight[];
};

export default function FlightsTimeline({ flights }: Props) {
    const data = Object.values(
        flights.reduce<Record<string, { hour: string; count: number }>>(
            (acc, f) => {
                const hour = new Date(
                    f.departure.scheduled
                ).getHours().toString();

                acc[hour] ??= { hour, count: 0 };
                acc[hour].count++;
                return acc;
            },
            {}
        )
    ).sort((a, b) => Number(a.hour) - Number(b.hour));

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#16a34a"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
