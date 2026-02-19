import { useState, useEffect } from "@/shared/deps";
import { fetchFlights } from "@/features/flights/index";
import { loadMockFlights, mapAviationStackResponse } from "../utils/flightMapper";
import type { AviationStackFlight } from "../types";

const PAGE_SIZE = 100;

export const useFlights = ({
  page,
  status,
  flightDate,
  depAirport,
  arrAirport,
  airline,
}: {
  page: number;
  status: string;
  flightDate: string;
  depAirport: string;
  arrAirport: string;
  airline: string;
}) => {
  const [flights, setFlights] = useState<AviationStackFlight[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

        if (USE_MOCK) {
          const response = await loadMockFlights();
          setFlights(mapAviationStackResponse(response));
          setTotal(response.pagination?.total ?? response.data.length);
          return;
        }

        const response = await fetchFlights({
          flight_status: status || undefined,
          flight_date: flightDate || undefined,
          dep_iata: depAirport || undefined,
          arr_iata: arrAirport || undefined,
          airline_name: airline || undefined,
          limit: PAGE_SIZE,
          offset: (page - 1) * PAGE_SIZE,
        });

        setFlights(mapAviationStackResponse(response));
        setTotal(response.pagination?.total ?? 0);
      } catch {
        setError("Failed to load flights");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, status, flightDate, depAirport, arrAirport, airline]);

  return { flights, total, loading, error };
};
