import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "../deps";
import { useAirlineChartData } from "../hooks/useAirlineBarChartData";
import type { AirlineBarChartProps } from "../types";

export default function AirlineBarChart({
  flights,
  selectedAirline,
  onSelect,
}: AirlineBarChartProps) {
  const data = useAirlineChartData(flights);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="count"
          fill="#2563eb"
          onClick={(entry) => {
            if (!entry?.name) return;
            onSelect(
              entry.name === selectedAirline
                ? ""
                : entry.name
            );
          }}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              opacity={
                selectedAirline &&
                entry.name !== selectedAirline
                  ? 0.4
                  : 1
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
