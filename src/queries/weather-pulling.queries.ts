import { BASE_URL } from "@lib/constants";
import { OpenMeteoServiceResponse } from "@lib/types";
import { useQuery } from "@tanstack/react-query";

export const useWeatherNowQuery = (
  {
    initialData,
    lat,
    lon,
    tz,
  }: {
    initialData?: OpenMeteoServiceResponse | null;
    lat: number;
    lon: number;
    tz?: string;
  },
  isEnabled: boolean
) => {
  const initialDataAvailable = !!initialData;

  return useQuery({
    queryKey: ["current-weather", lat, lon, tz ?? "auto"],
    queryFn: async () => {
      const res = await fetch(
        new URL(
          `/api/current-weather?lat=${lat}&lon=${lon}&timezone=${tz}`,
          BASE_URL
        ),
        { cache: "no-store" }
      );

      return await res.json();
    },
    initialData: initialDataAvailable ? initialData! : undefined,
    initialDataUpdatedAt: initialDataAvailable ? Date.now() : undefined,
    enabled: isEnabled,
    staleTime: initialDataAvailable ? 5 * 60 * 1000 : 0,
    refetchOnMount: initialDataAvailable ? false : "always",
    refetchOnWindowFocus: false,
    refetchInterval: 3 * 60 * 1000,
    refetchIntervalInBackground: true,
  });
};
