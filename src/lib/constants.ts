export const QUOTABLE_CONFIG = {
  url: "https://api.quotable.io",
  defaultMaxLength: "120",
  defaultTags: "inspirational|life|wisdom|wellbeing",
} as const;

export const IP_API_CONFIG = {
  url: "http://ip-api.com",
  // "24.48.0.1", // Montreal (Canada) IP for development only
  // "181.49.0.1", // Cartagena (Colombia) IP for development only

  defaultIP: "181.49.0.1",
} as const;

export const PRIVATE_IP_REGEX =
  /^(::1|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.|169\.254\.|100\.(6[4-9]|[7-9]\d|1\d{2}|2[0-1]\d|22[0-3])\.)/;

export const WEATHER_CONFIG = {
  url: "https://api.open-meteo.com",
  defaultTimezone: "auto",
  defaultWindSpeedUnit: "kmh",
  defaultCurrent: [
    "temperature_2m",
    "apparent_temperature",
    "weather_code",
    "wind_speed_10m",
    "is_day",
    "relative_humidity_2m",
    "surface_pressure",
    "uv_index",
  ],
} as const;

export const UNSPLASH_CONFIG = {
  url: "https://api.unsplash.com",
  defaultPhotosPerPage: "3",
  defaultOrientation: "portrait",
} as const;

export const BASE_URL =
  process.env.BASE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`);

export const MODAL_NAME_KEY = "MODAL_NAME_KEY";

export const SHOULD_RESPONSE_MOCKS =
  process.env.NODE_ENV === "development" && process.env.USE_MOCKS === "true";
