import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { AviationStackFlight } from "../../types/aviation";

type Props = {
  flights: AviationStackFlight[];
  selectedAirline: string;
  onSelect: (airline: string) => void;
};

type AirlineData = {
  name: string;
  count: number;
};

export default function AirlineBarChart({ flights, selectedAirline, onSelect }: Props) {
  const data = Object.values(
    flights.reduce<Record<string, AirlineData>>(
      (acc, f) => {
        const name = f.airline.name;
        acc[name] ??= { name, count: 0 };
        acc[name].count++;
        return acc;
      },
      {}
    )
  );

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#2563eb" onClick={(data) => {
          if (!data?.name) { return; }
          onSelect(data.name === selectedAirline ? "" : data.name)
        }} >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              opacity={selectedAirline && entry.name !== selectedAirline ? 0.4 : 1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
