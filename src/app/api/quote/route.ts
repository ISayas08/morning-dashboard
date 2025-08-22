import { fetchRandomInspirationalQuote } from "@services/quotable.service";

export const revalidate = 3600;

export async function GET() {
  try {
    const quoteRes = await fetchRandomInspirationalQuote();

    if (quoteRes.hasErrors) {
      // log to monitoring tool (Sentry, Datadog, Splunk, etc) out of scope.
      return new Response("Internal error", { status: 502 });
    }

    return Response.json(quoteRes.data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    // log to monitoring tool (Sentry, Datadog, Splunk, etc) out of scope.
    console.log(err);
    return new Response("Internal error", { status: 502 });
  }
}
