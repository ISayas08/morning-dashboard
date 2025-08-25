import apiRouteFetch from "@lib/fetch-util";
import { getRainCategory, isRain } from "@lib/rain-map.util";
import { SHOULD_RESPONSE_MOCKS, WEATHER_CONFIG } from "@lib/constants";
import { OpenMeteoServiceResponse } from "@lib/types";
import { open_meteo_service_response_mock } from "./downstream-services.mock";

interface FetchCurrentWeatherParams {
  lat: string;
  lon: string;
  timeZone?: string;
}

export interface OpenMeteoCurrentUnits {
  time: "iso8601";
  interval: "seconds";
  temperature_2m: "°C";
  apparent_temperature: "°C";
  weather_code: "wmo code";
  wind_speed_10m: "km/h";
  is_day: "";
  relative_humidity_2m: "%";
  surface_pressure: "hPa";
  uv_index: "";
}

export interface OpenMeteoCurrent {
  time: string;
  interval: number;
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  is_day: number;
  relative_humidity_2m: number;
  surface_pressure: number;
  uv_index: number;
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: OpenMeteoCurrentUnits;
  current: OpenMeteoCurrent;
}

const weatherDataMapper = (
  rawData: OpenMeteoResponse
): OpenMeteoServiceResponse | null => {
  if (!rawData) return null;

  const { current: currentWeather } = rawData;

  return {
    temp: currentWeather.temperature_2m as number,
    feelsLike: currentWeather.apparent_temperature as number,
    windKph: currentWeather.wind_speed_10m as number,
    code: currentWeather.weather_code as number,
    isDay: Boolean(currentWeather.is_day),
    unit: rawData.current_units?.temperature_2m ?? "°C",
    rainCategory: getRainCategory(currentWeather.weather_code as number),
    isRain: isRain(currentWeather.weather_code as number),
    humidity: currentWeather.relative_humidity_2m,
    pressure: currentWeather.surface_pressure,
    uvIndex: currentWeather.uv_index,
  };
};

export const OPEN_METEO_FORECAST_ENDPOINT = "/v1/forecast";

export const fetchCurrentWeather = async (
  params: FetchCurrentWeatherParams
) => {
  if (SHOULD_RESPONSE_MOCKS) return open_meteo_service_response_mock;

  const url = new URL(OPEN_METEO_FORECAST_ENDPOINT, WEATHER_CONFIG.url);
  url.searchParams.set("latitude", params.lat);
  url.searchParams.set("longitude", params.lon);
  url.searchParams.set(
    "timezone",
    params.timeZone ?? WEATHER_CONFIG.defaultTimezone
  );
  url.searchParams.set("current", WEATHER_CONFIG.defaultCurrent.join(","));
  url.searchParams.set("wind_speed_unit", WEATHER_CONFIG.defaultWindSpeedUnit);

  return apiRouteFetch<OpenMeteoResponse, OpenMeteoServiceResponse | null>(
    url,
    { cache: "no-store" },
    weatherDataMapper
  );
};
