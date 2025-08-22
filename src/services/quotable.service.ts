//@ts-ignore
import { Agent, fetch } from "undici";

import { QUOTABLE_CONFIG } from "@lib/constants";

type GetRandomInspirationalQuoteParams = {
  tags?: string;
  maxLength?: string;
};

export const runtime = "nodejs";

const insecureAgent = new Agent({
  // WARNING: This disables SSL certificate validation.
  // Only used for this technical test.
  // The quotable API certificate is currently expired, so this workaround is necessary.
  // I am aware we should NOT use this in production environments.
  connect: { rejectUnauthorized: false },
});

export const fetchRandomInspirationalQuote = async (
  params?: GetRandomInspirationalQuoteParams
) => {
  const quotableURL = new URL(`${QUOTABLE_CONFIG.url}/random`);
  quotableURL.searchParams.set(
    "tags",
    params?.tags ?? QUOTABLE_CONFIG.defaultTags
  );
  quotableURL.searchParams.set(
    "maxLength",
    String(params?.maxLength ?? QUOTABLE_CONFIG.defaultMaxLength)
  );

  const res = await fetch(quotableURL, {
    cache: "no-store",
    dispatcher: insecureAgent,
  });

  if (!res.ok)
    return {
      data: null,
      hasErrors: true,
      error: new Error("Quotable Service | Fetch failed"),
    };

  return {
    data: await res.json(),
  };
};
