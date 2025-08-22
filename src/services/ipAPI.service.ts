import { IP_API_CONFIG } from "@/lib/constants";

export const fetchGeoDataByIp = async (ip: string) => {
  const ipAPIURL = new URL(`/json/${ip}`, IP_API_CONFIG.url);

  const res = await fetch(ipAPIURL, {
    cache: "no-store",
  });

  if (!res.ok)
    return {
      data: null,
      hasErrors: true,
      error: new Error("IP Service | Fetch failed"),
    };

  return {
    data: await res.json(),
  };
};
