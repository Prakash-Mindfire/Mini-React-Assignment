import type { FlightFilters, AviationStackFlight, AviationStackResponse } from "../types";
import { apiClient } from "../../../shared/api/client";

const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;

// export async function fetchFlights(
//   filters: FlightFilters
// ): Promise<AviationStackResponse<AviationStackFlight>> {
//   try {
//     const params = {
//       access_key: API_KEY,
//       ...filters,
//     };

//     const response = await api.get("/flights", { params });

//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(
//         error.response?.data?.error?.message ??
//         "Failed to fetch flights"
//       );
//     }
//     throw new Error("Unknown error occurred");
//   }
// }

export default async function fetchFlights(
  filters: FlightFilters
): Promise<AviationStackResponse<AviationStackFlight>> {
  try {
    const response = await apiClient.get("/flights", {
      params: {
        access_key: API_KEY,
        ...filters,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch flights");
    }
    throw new Error("Unknown error occurred");
  }
}