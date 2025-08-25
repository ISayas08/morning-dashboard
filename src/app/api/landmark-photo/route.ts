import { fetchRandomLandmarkByCityName } from "@services/unsplash.service";

export const revalidate = 7200;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cityName = searchParams.get("cityName");

  if (!cityName) {
    return new Response("Missing cityName parameter", { status: 400 });
  }

  const landmarkPhotos = await fetchRandomLandmarkByCityName(cityName);

  if (!landmarkPhotos.data) {
    // log to monitoring tool (Sentry, Datadog, Splunk, etc) out of scope.
    return new Response("Internal error", { status: 502 });
  }

  return Response.json(landmarkPhotos.data, {
    headers: {
      "Cache-Control":
        "public, max-age=7200, s-maxage=7200, stale-while-revalidate=600",
    },
  });
}
