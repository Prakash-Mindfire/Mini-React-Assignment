// src/types/aviation.ts

export type FlightStatus =
  | "scheduled"
  | "active"
  | "landed"
  | "cancelled"
  | "delayed"
  | "incident"
  | "diverted";

export interface Airline {
  name: string;
  iata: string;
  icao: string;
}

export interface Flight {
  number: string;
  iata: string;
  icao: string;
  codeshared: string | null;

  // computed
  display_number: string;
}

export interface Aircraft {
  registration: string | null;
  iata: string | null;
  icao: string | null;
  icao24: string;
}

export interface FlightTime {
  airport: string;
  iata: string;
  icao: string;
  scheduled: string;
  estimated: string | null;
  terminal: string | null;
  gate: string | null;
  delay: number | null;
  timezone: string | null;
  actual: string | null;
  estimated_runway: string | null;
  actual_runway: string | null;
}

export interface FlightTimeComputed {
  formatted_time: string;
  formatted_date: string;
  is_delayed: boolean;
}

export interface AviationStackFlight {
  flight_date: string;
  flight_status: FlightStatus;

  airline: Airline;
  aircraft: Aircraft | null;
  flight: Flight;
  live: any | null;

  departure: FlightTime & FlightTimeComputed;
  arrival: FlightTime & FlightTimeComputed;

  // global computed
  computed: {
    total_delay: number;
    duration_minutes: number;
    route: string;
    is_active: boolean;
    is_scheduled: boolean;
    is_canceled: boolean;
  };
}

export interface AviationStackResponse<T> {
  pagination?: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: T[];
}