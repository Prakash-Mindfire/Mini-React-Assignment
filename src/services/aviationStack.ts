import axios from "axios";
import type { AviationStackFlight } from "../types/aviation";
import type { AviationStackResponse } from "../types/aviation";

const api = axios.create({
  baseURL: "https://api.aviationstack.com/v1",
  timeout: 10000,
});

const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;

export type FlightFilters = {
  limit?: number;
  offset?: number;

  flight_status?: string;
  flight_date?: string;
  dep_iata?: string;
  arr_iata?: string;
  airline_name?: string;
  flight_iata?: string;
};

export async function fetchFlights(
  filters: FlightFilters
): Promise<AviationStackResponse<AviationStackFlight>> {
  try {
    const params = {
      access_key: API_KEY,
      ...filters,
    };

    const response = await api.get("/flights", { params });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error?.message ??
        "Failed to fetch flights"
      );
    }
    throw new Error("Unknown error occurred");
  }
}
