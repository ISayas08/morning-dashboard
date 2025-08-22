import Dashboard from "@components/dashboard/dashboard";
import { BASE_URL } from "@lib/constants";

export const revalidate = 0;

const api = (path: string, init?: RequestInit) =>
  fetch(new URL(path, BASE_URL), init);

export default async function Home() {
  const quote = await api("/api/quote").then((r) => (r.ok ? r.json() : null));

  const geo = await api("/api/location").then((r) => (r.ok ? r.json() : null));

  const weather = geo
    ? await api(
        `/api/current-weather?lat=${geo.lat}&lon=${geo.lon}&timezone=${geo.timezone}`
      ).then((r) => r.json())
    : null;

  return (
    <Dashboard initialGeo={geo} initialWeather={weather} initialQuote={quote} />
  );
}
