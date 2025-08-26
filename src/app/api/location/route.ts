import { fetchGeoDataByIp } from "@services/ipAPI.service";
import { PRIVATE_IP_REGEX } from "@lib/constants";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ip = searchParams.get("ip") || "";

  const isPrivate = PRIVATE_IP_REGEX.test(ip);

  if (isPrivate) {
    return Response.json(
      { status: "private_ip", isPrivateIP: true, query: ip },
      { status: 200 }
    );
  }

  const ipAPIRes = await fetchGeoDataByIp(ip);

  if ("isErrored" in ipAPIRes && ipAPIRes.isErrored) {
    // log to monitoring tool (Sentry, Datadog, Splunk, etc) out of scope.
    return new Response("Internal error", { status: 502 });
  }

  return Response.json(
    { ...ipAPIRes.data, isPrivateIP: false },
    {
      headers: {
        "Cache-Control":
          "public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600",
        Vary: "x-forwarded-for",
      },
    }
  );
}
