import { queryOptions } from "@tanstack/react-query";

export const weatherNowQuery = (lat: string, lon: string, timeZone?: string) =>
  queryOptions({
    queryKey: ["current-weather", lat, lon, timeZone ?? "auto"],
    queryFn: async () => {
      const params = new URLSearchParams({ lat, lon });
      if (timeZone) params.set("timezone", timeZone);

      try {
        const res = await fetch(`/api/weather?${params.toString()}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error(res.json());
          return { hasError: true };
        }
        return res.json();
      } catch (err) {
        console.error(err);
      }
    },
    select: (r) => r.data,
    staleTime: 60 * 5 * 1000, // five minutes
  });
