import React from "react";

import styles from "./header.module.scss";
import { RainCategory } from "@/lib/types";

interface HeaderProps {
  name: string;
  city: string;
  rainCategory: RainCategory;
}

const Header: React.FC<HeaderProps> = ({ name, city, rainCategory }) => {
  const tagline = (() => {
    switch (rainCategory) {
      case "clear":
      return `Clear skies in ${city}. Perfect excuse to get out and do something fun!`;
      case "drizzle":
      return `Just a little drizzle in ${city} — grab your coffee and maybe a hoodie.`;
      case "rain":
      return `Raining in ${city}. Finally, a worthy opponent for your umbrella!`;
      case "showers":
      return `Showers on and off in ${city} — kinda like your Wi-Fi, but wetter!`;
      case "storm":
      return `Stormy in ${city}! How much did you actually want to go outside today?`;
    }
  })();

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>
        {"Good morning" + (name ? ", " + name : "") + "!"}
      </h1>
      <p className={styles.headerFunnyQuote}>{tagline}</p>
    </header>
  );
};

export default Header;
