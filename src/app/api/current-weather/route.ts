import { fetchCurrentWeather } from "@services/open-meteo.service";

export const revalidate = 60;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const timezone = searchParams.get("timezone") ?? undefined;

  if (!lat || !lon || Number.isNaN(Number(lat)) || Number.isNaN(Number(lon))) {
    return Response.json({ error: "invalid_coords" }, { status: 400 });
  }

  const result = await fetchCurrentWeather({
    lat,
    lon,
    timeZone: timezone,
  });

  if (!result.data) return new Response("Internal error", { status: 502 });

  return Response.json(result.data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
    },
  });
}
