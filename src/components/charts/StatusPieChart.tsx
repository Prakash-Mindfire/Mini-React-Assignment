import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { AviationStackFlight } from "../../types/aviation";

const COLORS: Record<string, string> = {
    scheduled: "#6b7280",
    active: "#16a34a",
    delayed: "#f59e0b",
    cancelled: "#dc2626",
    landed: "#2563eb",
};

type Props = {
    flights: AviationStackFlight[];
    selectedStatuses: string[];
    onToggleStatus: (status: string) => void;
};

const STATUSES = [
    "scheduled",
    "active",
    "landed",
    "delayed",
    "cancelled",
];

export default function StatusPieChart({
    flights,
    selectedStatuses,
    onToggleStatus,
}: Props) {

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

    return (
        <>
            <div className="pie-chart">
                <ResponsiveContainer width="50%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={50}
                            outerRadius={90}
                            onClick={(entry) => {
                                if (typeof entry?.name === "string") {
                                    onToggleStatus(entry.name);
                                }
                            }}
                        >
                            {data.map((d) => (
                                <Cell
                                    key={d.name}
                                    fill={COLORS[d.name] || "#888"}
                                    opacity={
                                        selectedStatuses.includes(d.name)
                                            ? 1
                                            : 0.3
                                    }
                                    cursor="pointer"
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                {/* Status checkboxes */}
                <div className="status-filters">
                    {STATUSES.map((s) => (
                        <label key={s} className="status-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedStatuses.includes(s)}
                                onChange={() => onToggleStatus(s)}
                            />
                            <span className={`status-pill ${s}`}>
                                {s} ({statusCounts[s]})
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </>
    );
}
