import { getRainCategory } from "@/lib/rain-map.util";
import { WEATHER_CONFIG } from "@lib/constants";

interface FetchCurrentWeatherParams {
  lat: string;
  lon: string;
  timeZone?: string;
}

export const fetchCurrentWeather = async (
  params: FetchCurrentWeatherParams
) => {
  const url = new URL(WEATHER_CONFIG.url);
  url.searchParams.set("latitude", params.lat);
  url.searchParams.set("longitude", params.lon);
  url.searchParams.set(
    "timezone",
    params.timeZone ?? WEATHER_CONFIG.defaultTimezone
  );
  url.searchParams.set("current", WEATHER_CONFIG.defaultCurrent.join(","));
  url.searchParams.set("wind_speed_unit", WEATHER_CONFIG.defaultWindSpeedUnit);

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    return {
      data: null,
      hasErrors: true as const,
      error: new Error(`Weather Service | Fetch failed (${res.status})`),
    };
  }

  const resJSON = await res.json();
  const currentWeather = resJSON.current;

  return {
    data: {
      temp: currentWeather.temperature_2m as number,
      feelsLike: currentWeather.apparent_temperature as number,
      windKph: currentWeather.wind_speed_10m as number,
      code: currentWeather.weather_code as number,
      isDay: Boolean(currentWeather.is_day),
      unit: resJSON.current_units?.temperature_2m ?? "°C",
      rainCategory: getRainCategory(currentWeather.weather_code as number),
    },
  };
};
