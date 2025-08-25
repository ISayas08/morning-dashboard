import { headers } from "next/headers";

import { BASE_URL, IP_API_CONFIG } from "@lib/constants";
import apiRouteFetch from "@lib/fetch-util";

import Header from "@components/header/header";
import Quote from "@components/quote/quote";
import LandmarkPhotos from "@components/landmark-photos/landmark-photos";
import WeatherCard from "@components/weather-card/weather-card";

import {
  LandMarkPhoto,
  OpenMeteoServiceResponse,
  QuotableResponse,
} from "@lib/types";
import styles from "./page.module.scss";
import { fetchGeoDataByIp } from "@/downstream-services/ipAPI.service";

export const revalidate = 0;

export default async function Home() {
  const { data: quote } = await apiRouteFetch<QuotableResponse>(
    new URL("/api/quote", BASE_URL)
  );

  const h = await headers();
  const ip =
    process.env.NODE_ENV === "development"
      ? IP_API_CONFIG.defaultIP
      : h.get("x-client-ip") ||
        h.get("x-forwarded-for")?.split(",")[0].trim() ||
        h.get("x-real-ip") ||
        "";

  // Note: There is an API route for IP lookup, but calling it from the server resolves the IP as Vercel's server IP, not the user's actual IP.
  const ipAPIRes = await fetchGeoDataByIp(ip);
  const { data: location } = ipAPIRes;

  if (("isErrored" in ipAPIRes && ipAPIRes.isErrored) || !location) {
    // log to monitoring tool (Sentry, Datadog, Splunk, etc) out of scope.
    console.log({ ipAPIRes });
    throw new Error("Failed to load location!");
  }

  const { data: initialWeather } =
    await apiRouteFetch<OpenMeteoServiceResponse>(
      new URL(
        `/api/current-weather?lat=${location.lat}&lon=${location.lon}&timezone=${location.timezone}`,
        BASE_URL
      )
    );

  const { data: landmarkPhotos } = await apiRouteFetch<LandMarkPhoto[]>(
    new URL(`/api/landmark-photo?cityName=${location.city}`, BASE_URL)
  );

  return (
    <main className={styles.shell}>
      {
        <Header
          city={location?.city}
          rainCategory={initialWeather?.rainCategory}
        />
      }

      <LandmarkPhotos landmarkPhotos={landmarkPhotos} />

      <WeatherCard
        cityName={location.city}
        isRenderingPhotos={!!landmarkPhotos?.length}
        lat={location.lat}
        lon={location.lon}
        timezone={location.timezone}
        weatherInitialData={initialWeather}
      />

      {quote && <Quote text={quote.content} author={quote.author} />}
    </main>
  );
}
