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

  // const geo = {
  //   status: "success",
  //   country: "Canada",
  //   countryCode: "CA",
  //   region: "QC",
  //   regionName: "Quebec",
  //   city: "Montreal",
  //   zip: "H1K",
  //   lat: 45.6085,
  //   lon: -73.5493,
  //   timezone: "America/Toronto",
  //   isp: "Le Groupe Videotron Ltee",
  //   org: "Videotron Ltee",
  //   as: "AS5769 Videotron Ltee",
  //   query: "24.48.0.1",
  //   isPrivateIP: false,
  // };

  // const weather = {
  //   temp: 28.3,
  //   feelsLike: 27.7,
  //   windKph: 6.3,
  //   code: 0,
  //   isDay: true,
  //   unit: "°C",
  //   rainCategory: "storm",
  //   isRain: false,
  // };

  // const quote = {
  //   _id: "yvGg7FErS-y",
  //   content: "Without courage, wisdom bears no fruit.",
  //   author: "Baltasar Gracián",
  //   tags: ["Famous Quotes", "Wisdom"],
  //   authorSlug: "baltasar-gracian",
  //   length: 39,
  //   dateAdded: "2020-01-12",
  //   dateModified: "2023-04-14",
  // };

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
      />

      <Quote text={quote.content} author={quote.author} />
    </main>
  );
}
