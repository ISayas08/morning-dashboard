import { Agent } from "undici";

import { QUOTABLE_CONFIG, SHOULD_RESPONSE_MOCKS } from "@lib/constants";
import apiRouteFetch from "@lib/fetch-util";
import { QuotableResponse } from "@lib/types";
import { quotable_service_response_mock } from "./downstream-services.mock";

type GetRandomInspirationalQuoteParams = {
  tags?: string;
  maxLength?: string;
};



const insecureAgent = new Agent({
  // WARNING: This disables SSL certificate validation.
  // Only used for this technical test.
  // The quotable API certificate is currently expired, so this workaround is necessary.
  // I am aware we should NOT use this in production environments.
  connect: { rejectUnauthorized: false },
});

export const QUOTABLE_RANDOM_ENDPOINT = "/random";

export const fetchRandomInspirationalQuote = async (
  params?: GetRandomInspirationalQuoteParams
) => {
  if (SHOULD_RESPONSE_MOCKS) return quotable_service_response_mock;

  const quotableURL = new URL(QUOTABLE_RANDOM_ENDPOINT, QUOTABLE_CONFIG.url);
  quotableURL.searchParams.set(
    "tags",
    params?.tags ?? QUOTABLE_CONFIG.defaultTags
  );
  quotableURL.searchParams.set(
    "maxLength",
    String(params?.maxLength ?? QUOTABLE_CONFIG.defaultMaxLength)
  );

  return apiRouteFetch<QuotableResponse>(quotableURL, {
    cache: "no-store",
    dispatcher: insecureAgent,
  });
};
