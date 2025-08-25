import { headers } from "next/headers";

import { fetchGeoDataByIp } from "@services/ipAPI.service";
import { IP_API_CONFIG, PRIVATE_IP_REGEX } from "@lib/constants";

const isDev = process.env.NODE_ENV === "development";

export async function GET() {
  const h = await headers();
  const ip = isDev
    ? IP_API_CONFIG.defaultIP
    : h.get("x-forwarded-for")?.split(",")[0].trim() ||
      h.get("x-real-ip") ||
      "";

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
