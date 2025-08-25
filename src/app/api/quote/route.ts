import { fetchRandomInspirationalQuote } from "@services/quotable.service";

export const revalidate = 3600;

export async function GET() {
  const quoteRes = await fetchRandomInspirationalQuote();

  if ("isErrored" in quoteRes && quoteRes.isErrored) {
    // log to monitoring tool (Sentry, Datadog, Splunk, etc) out of scope.
    return new Response("Internal error", { status: 502 });
  }

  return Response.json(quoteRes.data, {
    headers: {
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
