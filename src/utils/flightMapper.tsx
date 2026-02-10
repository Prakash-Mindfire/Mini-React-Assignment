// src/utils/flightMapper.tsx
import mockData from "../mocks/mock_all_flights.json";
import type { AviationStackFlight, FlightStatus } from "../types/aviation";

/* ---------------- RAW API TYPES (ONLY USED HERE) ---------------- */

export interface RawFlightData {
  flight_date: string;
  flight_status: string;

  airline: {
    name: string;
    iata: string;
    icao?: string;
  };

  flight: {
    number: string;
    iata: string;
    icao?: string;
    codeshared?: string | null;
  };

  departure: {
    airport: string | null;
    timezone?: string;
    iata: string;
    icao?: string;
    terminal: string | null;
    gate: string | null;
    delay: number | null;
    scheduled: string;
    estimated: string | null;
    actual?: string | null;
    estimated_runway?: string | null;
    actual_runway?: string | null;
  };

  arrival: {
    airport: string | null;
    timezone?: string;
    iata: string;
    icao?: string;
    terminal: string | null;
    gate: string | null;
    baggage?: string | null;
    scheduled: string;
    delay: number | null;
    estimated: string | null;
    actual?: string | null;
    estimated_runway?: string | null;
    actual_runway?: string | null;
  };

  aircraft?: {
    registration: string | null;
    iata: string | null;
    icao: string | null;
    icao24: string;
  } | null;

  live?: any;
}

export interface AviationStackResponse {
  data: RawFlightData[];
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
}

/* ---------------- PUBLIC API ---------------- */

export function mapAviationStackResponse(
  response: { data?: any[] } | null | undefined
) {
  if (!response || !Array.isArray(response.data)) {
    console.warn("Invalid AviationStack response:", response);
    return [];
  }

  return response.data.map(mapSingleFlight);
}

/* ---------------- MAPPER ---------------- */

function mapSingleFlight(raw: RawFlightData): AviationStackFlight {
  const depTime = formatFlightTime(
    raw.departure.scheduled,
    raw.departure.estimated,
    raw.departure.actual
  );

  const arrTime = formatFlightTime(
    raw.arrival.scheduled,
    raw.arrival.estimated,
    raw.arrival.actual
  );

  const totalDelay =
    raw.arrival.delay ?? raw.departure.delay ?? 0;

  return {
    flight_date: raw.flight_date,
    flight_status: normalizeFlightStatus(raw.flight_status),

    airline: {
      name: raw.airline.name,
      iata: raw.airline.iata,
      icao: raw.airline.icao ?? "",
    },

    aircraft: raw.aircraft ?? null,
    live: raw.live ?? null,

    flight: {
      number: raw.flight.number,
      iata: raw.flight.iata,
      icao: raw.flight.icao ?? "",
      codeshared: raw.flight.codeshared ?? null,
      display_number: raw.flight.iata || `FL ${raw.flight.number}`,
    },

    departure: {
      airport: raw.departure.airport ?? "Unknown Airport",
      iata: raw.departure.iata,
      icao: raw.departure.icao ?? "",
      scheduled: raw.departure.scheduled,
      estimated: raw.departure.estimated,
      terminal: raw.departure.terminal,
      gate: raw.departure.gate,
      delay: raw.departure.delay,
      timezone: raw.departure.timezone ?? null,
      actual: raw.departure.actual ?? null,
      estimated_runway: raw.departure.estimated_runway ?? null,
      actual_runway: raw.departure.actual_runway ?? null,

      formatted_time: depTime.time,
      formatted_date: depTime.date,
      is_delayed: (raw.departure.delay ?? 0) > 0,
    },

    arrival: {
      airport: raw.arrival.airport ?? "Unknown Airport",
      iata: raw.arrival.iata,
      icao: raw.arrival.icao ?? "",
      scheduled: raw.arrival.scheduled,
      estimated: raw.arrival.estimated,
      terminal: raw.arrival.terminal,
      gate: raw.arrival.gate,
      delay: raw.arrival.delay,
      timezone: raw.arrival.timezone ?? null,
      actual: raw.arrival.actual ?? null,
      estimated_runway: raw.arrival.estimated_runway ?? null,
      actual_runway: raw.arrival.actual_runway ?? null,
      // baggage: raw.arrival.baggage ?? null,

      formatted_time: arrTime.time,
      formatted_date: arrTime.date,
      is_delayed: (raw.arrival.delay ?? 0) > 0,
    },

    computed: {
      total_delay: totalDelay,
      duration_minutes: calculateDuration(
        raw.departure.scheduled,
        raw.arrival.scheduled
      ),
      route: `${raw.departure.iata} → ${raw.arrival.iata}`,
      is_active: raw.flight_status === "active",
      is_scheduled: raw.flight_status === "scheduled",
      is_canceled: raw.flight_status === "cancelled",
    },
  };
}

/* ---------------- HELPERS ---------------- */

function normalizeFlightStatus(status: string): FlightStatus {
  const allowed: FlightStatus[] = [
    "scheduled",
    "active",
    "landed",
    "cancelled",
    "delayed",
    "incident",
    "diverted",
  ];

  return allowed.includes(status as FlightStatus)
    ? (status as FlightStatus)
    : "scheduled";
}

function formatFlightTime(
  scheduled: string,
  estimated?: string | null,
  actual?: string | null
) {
  const value = actual || estimated || scheduled;
  const d = new Date(value);

  return {
    time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    date: d.toLocaleDateString([], { month: "short", day: "numeric" }),
  };
}

function calculateDuration(dep: string, arr: string): number {
  const diff = new Date(arr).getTime() - new Date(dep).getTime();
  return Math.max(0, Math.round(diff / 60000));
}

export async function loadMockFlights(): Promise<AviationStackResponse<any>> {
  await new Promise((res) => setTimeout(res, 300));
  return mockData as AviationStackResponse<any>;
}

export const FlightDataTransformers = {
  forDelayPieChart(flights: AviationStackFlight[]) {
    return flights.map(f => ({
      label: f.flight.display_number,
      value: f.computed.total_delay,
    }));
  },

  forStatusBarChart(flights: AviationStackFlight[]) {
    const map: Record<string, number> = {};

    flights.forEach(f => {
      map[f.flight_status] = (map[f.flight_status] || 0) + 1;
    });

    return Object.entries(map).map(([status, count]) => ({
      status,
      count,
    }));
  },

  forMapVisualization(flights: AviationStackFlight[]) {
    return flights.map(f => ({
      route: f.computed.route,
      from: f.departure.iata,
      to: f.arrival.iata,
    }));
  },
};
