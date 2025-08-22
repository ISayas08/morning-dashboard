type Quote = { content: string; author: string };

type Weather = {
  temp: number;
  feelsLike: number;
  windKph: number;
  code: number;
  isDay: boolean;
  unit: string;
  rainCategory?: string;
};

type Geo = {
  city?: string;
  country?: string;
  lat: number;
  lon: number;
  timezone: string;
};

interface DashboardProps {
  initialGeo?: Geo | null;
  initialQuote?: Quote | null;
  initialWeather?: Weather | null;
}

const Dashboard: React.FC<DashboardProps> = ({
  initialGeo,
  initialQuote,
  initialWeather,
}) => {
  return (
    <main style={{ padding: 16 }}>
      <h1>Dashboard</h1>

      {initialGeo && (
        <section>
          <h2>Location</h2>
          <pre>{JSON.stringify(initialGeo, null, 2)}</pre>
        </section>
      )}

      {initialQuote && (
        <section>
          <h2>Quote</h2>
          <pre>{JSON.stringify(initialQuote, null, 2)}</pre>
        </section>
      )}

      {initialWeather && (
        <section>
          <h2>Weather</h2>
          <pre>{JSON.stringify(initialWeather, null, 2)}</pre>
        </section>
      )}
    </main>
  );
};

export default Dashboard;
