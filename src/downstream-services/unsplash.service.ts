import apiRouteFetch from "@lib/fetch-util";
import { SHOULD_RESPONSE_MOCKS, UNSPLASH_CONFIG } from "@lib/constants";
import { LandMarkPhoto } from "@lib/types";
import { unsplash_service_response_mock } from "./downstream-services.mock";

interface UnsplashResponsePhoto {
  id: string;
  urls: { regular: string; small: string };
  alt_description: string | null;
  user: { name: string; links: { html: string } };
}

interface LandMarkPhotoServiceResponse {
  data: LandMarkPhoto[] | null;
  hasErrors?: boolean;
  error?: Error;
}

const unsplashMapper = (
  rawData: UnsplashResponsePhoto[]
): LandMarkPhoto[] | null => {
  if (!rawData) return null;

  return rawData.map((photo) => ({
    id: photo.id,
    urlRegular: photo.urls.regular,
    urlSmall: photo.urls.small,
    alt: photo.alt_description || "Unsplash photo",
    author: photo.user.name,
  }));
};

export const UNSPLASH_RANDOM_PIC_ENDPOINT = "/photos/random";

export const fetchRandomLandmarkByCityName = async (cityName: string) => {
  if (SHOULD_RESPONSE_MOCKS) return unsplash_service_response_mock;

  const unsplashURL = new URL(
    UNSPLASH_RANDOM_PIC_ENDPOINT,
    UNSPLASH_CONFIG.url
  );

  unsplashURL.searchParams.set("query", cityName);
  unsplashURL.searchParams.set("count", UNSPLASH_CONFIG.defaultPhotosPerPage);
  unsplashURL.searchParams.set(
    "orientation",
    UNSPLASH_CONFIG.defaultOrientation
  );
  unsplashURL.searchParams.set(
    "client_id",
    process.env.UNSPLASH_ACCESS_KEY ?? ""
  );

  return apiRouteFetch<UnsplashResponsePhoto[], LandMarkPhoto[] | null>(
    unsplashURL,
    null,
    unsplashMapper
  );
};
