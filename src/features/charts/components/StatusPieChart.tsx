import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "../deps";

import { COLORS, STATUSES } from "../constants";
import { useStatusChartData } from "../hooks/useStatusChartData";
import type { StatusPieChartProps } from "../types";

export default function StatusPieChart({
  flights,
  selectedStatuses,
  onToggleStatus,
}: StatusPieChartProps) {
  const { data, statusCounts } = useStatusChartData(
    flights,
    selectedStatuses
  );

  return (
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
                  selectedStatuses.includes(d.name) ? 1 : 0.3
                }
                cursor="pointer"
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

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
  );
}
