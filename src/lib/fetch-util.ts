import { fetch } from "undici";
import { ErrorResponse } from "./types";
import type { RequestInit as UndiciRequestInit } from "undici";

export interface APIFetchResponse<T> {
  data: T;
  isErrored?: boolean;
}

const errorResponse: ErrorResponse = {
  isErrored: true,
  data: null,
};

const apiRouteFetch = async <T, MT = T>(
  url: string | URL,
  config?: UndiciRequestInit | null,
  mapper: null | ((rawData: T) => MT) = null
): Promise<ErrorResponse | APIFetchResponse<T | MT>> => {
  try {
    const requestConfig = config ?? { cache: "no-store" };
    const res = await fetch(url, requestConfig);

    if (!res.ok) {
      return { ...errorResponse, error: new Error(`Fetch failed | ${url}`) };
    }

    const raw = (await res.json()) as T;
    return {
      data: !mapper ? (raw as unknown as MT) : mapper(raw),
    };
  } catch (error) {
    // log to monitoring tool (out of scope)
    console.error(error);
    return { ...errorResponse, error } as ErrorResponse;
  }
};

export default apiRouteFetch;
