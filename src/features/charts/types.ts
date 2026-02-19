import type { AviationStackFlight } from "../flights/types";

export type AirlineBarChartProps = {
  flights: AviationStackFlight[];
  selectedAirline: string;
  onSelect: (airline: string) => void;
};

export type AirlineData = {
  name: string;
  count: number;
};

export type FlightsTimelineProps = {
  flights: AviationStackFlight[];
};

export type TimelinePoint = {
  hour: string;
  count: number;
};

export type StatusPieChartProps = {
  flights: AviationStackFlight[];
  selectedStatuses: string[];
  onToggleStatus: (status: string) => void;
};

export type StatusChartData = {
  name: string;
  value: number;
};