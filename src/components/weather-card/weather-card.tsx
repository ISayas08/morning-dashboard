import React from "react";
import styles from "./weather-card.module.scss";
import { RainCategory } from "@lib/types";

interface Props {
  temp: number;
  feelsLike: number;
  windKph: number;
  unit: "°C" | "°F";
  isDay: boolean;
  rainCategory: RainCategory;
  city?: string;
}

const conditionIcon = (rc: RainCategory, isDay: boolean) => {
  if (rc === "clear") return isDay ? "sunny" : "clear_night";
  if (rc === "drizzle") return "rainy_light";
  if (rc === "rain") return "rainy";
  if (rc === "showers") return "rainy_heavy";
  return "thunderstorm";
};

export default function WeatherTriptych({
  temp,
  feelsLike,
  windKph,
  unit,
  isDay,
  rainCategory,
  city,
}: Props) {
  return (
    <section className={styles.weather} aria-label="Current weather">
      <article className={styles.weatherItem}>
        <div className={styles.weatherIconWrap} aria-hidden="true">
          <span className={`${styles.weatherIcon} material-symbols-outlined`}>
            device_thermostat
          </span>
        </div>
        <div className={styles.weatherItemContent}>
          <div className={styles.weatherValue}>
            <span className={styles.weatherNumber}>{Math.round(temp)}</span>
            <span className={styles.weatherUnit}>{unit}</span>
          </div>
          <div className={styles.weatherLabel}>Temperature</div>
          <div className={styles.weatherHelp}>
            Feels like {Math.round(feelsLike)}
            {unit}
          </div>
        </div>
      </article>

      <article className={styles.weatherItem}>
        <div className={styles.weatherIconWrap} aria-hidden="true">
          <span className={`${styles.weatherIcon} material-symbols-outlined`}>
            air
          </span>
        </div>
        <div className={styles.weatherItemContent}>
          <div className={styles.weatherValue}>
            <span className={styles.weatherNumber}>{Math.round(windKph)}</span>
            <span className={styles.weatherUnit}>km/h</span>
          </div>
          <div className={styles.weatherLabel}>Wind</div>
          <div className={styles.weatherHelp}>{city || "Outdoor"}</div>
        </div>
      </article>

      <article className={styles.weatherItem}>
        <div className={styles.weatherIconWrap} aria-hidden="true">
          <span className={`${styles.weatherIcon} material-symbols-outlined`}>
            {conditionIcon(rainCategory, isDay)}
          </span>
        </div>
        <div className={styles.weatherItemContent}>
          <div className={styles.weatherValue}>
            <span className={styles.weatherNumber}>
              {
                (
                  {
                    clear: "Clear",
                    drizzle: "Drizzle",
                    rain: "Rain",
                    showers: "Showers",
                    storm: "Storm",
                  } as const
                )[rainCategory]
              }
            </span>
          </div>
          <div className={styles.weatherLabel}>Condition</div>
          <div className={styles.weatherHelp}>{isDay ? "Day" : "Night"}</div>
        </div>
      </article>
    </section>
  );
}
