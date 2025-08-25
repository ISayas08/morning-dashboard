"use client";
import React from "react";

import { OpenMeteoServiceResponse, RainCategory } from "@lib/types";
import { weatherNowQuery } from "@queries/weather-pulling.queries";
import WeatherCardSkeleton from "./weather-card-skeleton";

import styles from "./weather-card.module.scss";

interface WeatherProps {
  cityName: string;
  isRenderingPhotos: boolean;
  lat: number;
  lon: number;
  timezone: string;
  weatherInitialData?: OpenMeteoServiceResponse | null;
}

const conditionIcon = (rc: RainCategory, isDay: boolean) => {
  if (rc === "clear") return isDay ? "sunny" : "clear_night";
  if (rc === "drizzle") return "rainy_light";
  if (rc === "rain") return "rainy";
  if (rc === "showers") return "rainy_heavy";
  return "thunderstorm";
};

const uvIndexCondition = (uvIndex: number): string => {
  if (uvIndex <= 2) return "Low";
  if (uvIndex <= 5) return "Moderate";
  if (uvIndex <= 7) return "High";
  if (uvIndex > 7) return "Very high";

  return "";
};

export default function WeatherTriptych({
  cityName,
  isRenderingPhotos,
  lat,
  lon,
  timezone: tz,
  weatherInitialData,
}: WeatherProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: weather, isPending } = weatherNowQuery(
    {
      initialData: weatherInitialData,
      lat,
      lon,
      tz,
    },
    isMounted
  );

  if (!weather && isPending)
    return <WeatherCardSkeleton isRenderingPhotos={isRenderingPhotos} />;

  const {
    temp,
    feelsLike,
    windKph,
    unit,
    isDay,
    rainCategory,
    humidity,
    pressure,
    uvIndex,
  } = weather;

  const weatherItems = [
    {
      icon: "device_thermostat",
      value: Math.round(temp),
      unit: unit,
      label: "Temperature",
      help: `Feels like ${Math.round(feelsLike)}${unit}`,
    },
    {
      icon: "air",
      value: Math.round(windKph),
      unit: "km/h",
      label: "Wind",
      help: cityName || "Outdoor",
    },
    {
      icon: conditionIcon(rainCategory, isDay),
      value: rainCategory,
      unit: "",
      label: "Condition",
      help: isDay ? "Day" : "Night",
    },
    {
      icon: "water_drop",
      value: humidity,
      unit: "%",
      label: "Humidity",
      help: cityName || "Outdoor",
    },
    {
      icon: "compress",
      value: pressure,
      unit: "hPa",
      label: "Pressure",
      help: "Sea level",
    },
    {
      icon: "wb_sunny",
      value: uvIndex,
      unit: "",
      label: "UV Index",
      help: uvIndexCondition(uvIndex),
    },
  ];

  return (
    <section
      className={styles.weather}
      aria-label="Current weather"
      style={
        {
          marginTop: isRenderingPhotos ? 20 : 200,
        } as React.CSSProperties
      }
    >
      <h2 id="weather-section" className={styles.weatherTitle}>
        Your weather report
      </h2>
      <div className={styles.weatherContainer}>
        {weatherItems.map((item) => (
          <article
            className={styles.weatherItem}
            key={`${item.label}-${item.value}`}
          >
            <div className={styles.weatherIconWrap} aria-hidden="true">
              <span
                className={`${styles.weatherIcon} material-symbols-outlined`}
              >
                {item.icon}
              </span>
            </div>
            <div className={styles.weatherItemContent}>
              <div className={styles.weatherValue}>
                <span className={styles.weatherNumber}>{item.value}</span>
                {item.unit && (
                  <span className={styles.weatherUnit}>{item.unit}</span>
                )}
              </div>
              <div className={styles.weatherLabel}>{item.label}</div>
              <div className={styles.weatherHelp}>{item.help}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
