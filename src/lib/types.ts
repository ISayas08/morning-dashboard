export type RainCategory = "clear" | "drizzle" | "rain" | "showers" | "storm";

export interface LandMarkPhoto {
  id: string;
  urlRegular: string;
  urlSmall: string;
  alt: string;
  author: string;
}

export interface ErrorResponse {
  isErrored: boolean;
  data: null | undefined;
  error?: Error;
}

export interface QuotableResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface IPAPIResponse {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
  isPrivateIP: boolean;
}

export interface OpenMeteoServiceResponse {
  temp: number;
  feelsLike: number;
  windKph: number;
  code: number;
  isDay: boolean;
  unit: string;
  rainCategory: RainCategory;
  isRain: boolean;
  humidity: number;
  pressure: number;
  uvIndex: number;
}
