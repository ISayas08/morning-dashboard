import { headers } from "next/headers";
import { BASE_URL, IP_API_CONFIG } from "@lib/constants";
import apiRouteFetch from "@lib/fetch-util";

import Header from "@components/header/header";
import Quote from "@components/quote/quote";
import LandmarkPhotos from "@components/landmark-photos/landmark-photos";
import WeatherCard from "@components/weather-card/weather-card";

import {
  IPAPIResponse,
  LandMarkPhoto,
  OpenMeteoServiceResponse,
  QuotableResponse,
} from "@lib/types";
import styles from "./page.module.scss";

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

  const { data: location } = await apiRouteFetch<IPAPIResponse>(
    new URL(`/api/location?ip=${ip}`, BASE_URL)
  );

  if (!location) {
    // Forcing error boundary to appear
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
