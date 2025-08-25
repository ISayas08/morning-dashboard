import { RainCategory } from "@/lib/types";

export const quotable_service_response_mock = {
  data: {
    _id: "yvGg7FErS-y",
    content:
      "I used to be and adventurer like you. Then I took an arrow to the knee",
    author: "Ex-adventurer",
    tags: ["Famous Quotes", "Wisdom"],
    authorSlug: "mockAuthor",
    length: 71,
    dateAdded: "2020-01-12",
    dateModified: "2023-04-14",
  },
};

export const ip_api_service_response_mock = {
  data: {
    status: "success",
    country: "Canada",
    countryCode: "CA",
    region: "QC",
    regionName: "Quebec",
    city: "Montreal",
    zip: "H1K",
    lat: 45.6085,
    lon: -73.5493,
    timezone: "America/Toronto",
    isp: "Le Groupe Videotron Ltee",
    org: "Videotron Ltee",
    as: "AS5769 Videotron Ltee",
    query: "24.48.0.1",
    isPrivateIP: false,
  },
};

export const open_meteo_service_response_mock = {
  data: {
    temp: 28.3,
    feelsLike: 27.7,
    windKph: 6.3,
    code: 0,
    isDay: true,
    unit: "°C",
    rainCategory: "storm" as RainCategory,
    isRain: false,
    humidity: 40,
    pressure: 1005.3,
    uvIndex: 2.9,
  },
};

export const unsplash_service_response_mock = {
  data: [
    {
      id: "photoId1",
      urlRegular:
        "https://images.unsplash.com/photo-1576612326837-9611b0a862fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTU4ODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTYwODM0OTJ8&ixlib=rb-4.1.0&q=80&w=1080",
      urlSmall:
        "https://images.unsplash.com/photo-1576612326837-9611b0a862fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTU4ODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTYwODM0OTJ8&ixlib=rb-4.1.0&q=80&w=400",
      alt: "a multicolored building on a city street",
      author: "Ryunosuke Kikuno",
    },
    {
      id: "photoId2",
      urlRegular:
        "https://images.unsplash.com/photo-1703065427829-26a7fcf5fce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTU4ODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTYwODM0OTJ8&ixlib=rb-4.1.0&q=80&w=1080",
      urlSmall:
        "https://images.unsplash.com/photo-1703065427829-26a7fcf5fce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTU4ODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTYwODM0OTJ8&ixlib=rb-4.1.0&q=80&w=400",
      alt: "a stone plaque with a group of men on it",
      author: "Ashwini Chaudhary(Monty)",
    },
    {
      id: "photoId3",
      urlRegular:
        "https://images.unsplash.com/photo-1703065427829-26a7fcf5fce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTU4ODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTYwODM0OTJ8&ixlib=rb-4.1.0&q=80&w=1080",
      urlSmall:
        "https://images.unsplash.com/photo-1703065427829-26a7fcf5fce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTU4ODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTYwODM0OTJ8&ixlib=rb-4.1.0&q=80&w=400",
      alt: "Church steeple with a cross on top.",
      author: "Anna Ozola",
    },
  ],
};
