import { BASE_URL } from "@lib/constants";
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

const api = async (path: string) =>
  fetch(new URL(path, BASE_URL), { cache: "no-store" });

export const revalidate = 0;

export default async function Home() {
  const { data: quote } = await apiRouteFetch<QuotableResponse>(
    new URL("/api/quote", BASE_URL)
  );

  const { data: location } = await apiRouteFetch<IPAPIResponse>(
    new URL("/api/location", BASE_URL)
  );

  if (!location) {
    // Forcing error boundary to appear
    throw new Error("Failed to load location!");
  }

  const { data: weather } = await apiRouteFetch<OpenMeteoServiceResponse>(
    new URL(
      `/api/current-weather?lat=${location.lat}&lon=${location.lon}&timezone=${location.timezone}`,
      BASE_URL
    )
  );

  console.log({ weather });

  if (!weather) {
    // Forcing error boundary to appear
    throw new Error("Failed to load weather!");
  }

  const { data: landmarkPhotos } = await apiRouteFetch<LandMarkPhoto[]>(
    new URL(`/api/landmark-photo?cityName=${location.city}`, BASE_URL)
  );

  return (
    <main className={styles.shell}>
      {<Header city={location?.city} rainCategory={weather?.rainCategory} />}

      <LandmarkPhotos landmarkPhotos={landmarkPhotos} />

      <WeatherCard
        isRenderingPhotos={!!landmarkPhotos?.length}
        temp={weather.temp}
        feelsLike={weather.feelsLike}
        windKph={weather.windKph}
        isDay={weather.isDay}
        unit="°C"
        rainCategory={weather.rainCategory}
        city={location.city}
        humidity={weather.humidity}
        pressure={weather.pressure}
        uvIndex={weather.uvIndex}
      />

      {quote && <Quote text={quote.content} author={quote.author} />}
    </main>
  );
}
