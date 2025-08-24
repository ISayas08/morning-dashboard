import Header from "@components/header/header";
import { BASE_URL } from "@lib/constants";

import styles from "./page.module.scss";
import Quote from "@components/quote/quote";
import WeatherCard from "@components/weather-card/weather-card";
import Timestamp from "@/components/timestamp/timestamp";
export const revalidate = 0;

const api = (path: string) =>
  fetch(new URL(path, BASE_URL), { cache: "no-store" });

export default async function Home() {
  const quote = await api("/api/quote").then((r) => (r.ok ? r.json() : null));

  const geo = await api("/api/location").then((r) => (r.ok ? r.json() : null));

  const weather = geo
    ? await api(
        `/api/current-weather?lat=${geo.lat}&lon=${geo.lon}&timezone=${geo.timezone}`
      ).then((r) => r.json())
    : null;

  return (
    <main className={styles.shell}>
      <Header
        name={"Aloy"} // @TODO ask for user name and store it in localstorage
        city={geo.city}
        rainCategory={weather.rainCategory}
      />
      <Timestamp />

      <WeatherCard
        temp={weather.temp}
        feelsLike={weather.feelsLike}
        windKph={weather.windKph}
        isDay={weather.isDay}
        unit="°C"
        rainCategory={weather.rainCategory}
        city={geo.city}
        humidity={weather.humidity}
        pressure={weather.pressure}
        uvIndex={weather.uvIndex}
      />

      <Quote text={quote.content} author={quote.author} />
    </main>
  );
}
