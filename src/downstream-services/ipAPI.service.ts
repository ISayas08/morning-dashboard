import apiRouteFetch from "@lib/fetch-util";
import { IP_API_CONFIG, SHOULD_RESPONSE_MOCKS } from "@lib/constants";
import { IPAPIResponse } from "@lib/types";
import { ip_api_service_response_mock } from "./downstream-services.mock";

export const IP_API_ENDPOINT = "/json";

export const fetchGeoDataByIp = async (ip: string) => {
  if (SHOULD_RESPONSE_MOCKS) return ip_api_service_response_mock;
  const ipAPI_URL = new URL(`${IP_API_ENDPOINT}/${ip}`, IP_API_CONFIG.url);

  return apiRouteFetch<IPAPIResponse>(ipAPI_URL, { cache: "no-store" });
};
