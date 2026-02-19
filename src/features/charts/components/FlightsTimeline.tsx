import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "../deps";
import { useFlightsTimelineData } from "../hooks/useFlightTimelineData";
import type { FlightsTimelineProps } from "../types";

export default function FlightsTimeline({
  flights,
}: FlightsTimelineProps) {
  const data = useFlightsTimelineData(flights);

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
