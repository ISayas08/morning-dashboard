"use client";
import React from "react";
import dynamic from "next/dynamic";

const NamePromptModal = dynamic(
  () => import("@components/name-prompt-modal/name-prompt-modal"),
  { ssr: false }
);
import { RainCategory } from "@lib/types";

import styles from "./header.module.scss";
import { MODAL_NAME_KEY } from "@/lib/constants";

interface HeaderProps {
  city?: string;
  rainCategory: RainCategory;
}

const Header: React.FC<HeaderProps> = ({ city, rainCategory }) => {
  const [name, setName] = React.useState<string | null>(null);
  const [isNameModalOpen, setIsNameModalOpen] = React.useState(true);
  const tagline = (() => {
    const cityText = city ? ` in ${city}` : "";
    switch (rainCategory) {
      case "clear":
        return `Clear skies${cityText}. Perfect excuse to get out and do something fun!`;
      case "drizzle":
        return `Just a little drizzle${cityText} — grab your coffee and maybe a hoodie.`;
      case "rain":
        return `Raining${cityText}. Finally, a worthy opponent for your umbrella!`;
      case "showers":
        return `Showers on and off${cityText} — kinda like your Wi-Fi, but wetter!`;
      case "storm":
        return `Stormy${cityText}! How much did you actually want to go outside today?`;
    }
  })();

  React.useEffect(() => {
    let name;
    try {
      name = localStorage.getItem(MODAL_NAME_KEY);
    } catch (error) {
      name = null;
    }
    if (name) {
      setName(name);
      setIsNameModalOpen(false);
    }
  }, []);

  const onCloseModal = () => {
    setIsNameModalOpen(false);
  };

  const onSubmitName = (name: string) => {
    try {
      localStorage.setItem(MODAL_NAME_KEY, name);
    } catch (error) {
      // pass, just in case localstorage is disabled...
    }
    setName(name);
    setIsNameModalOpen(false);
  };

  return (
    <>
      <NamePromptModal
        open={isNameModalOpen}
        onClose={onCloseModal}
        onSubmit={onSubmitName}
      />
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          Good morning
          {name && <span className={styles.headerUserName}>{name}</span>}!
        </h1>
        <p className={styles.headerFunnyQuote}>{tagline}</p>
      </header>
    </>
  );
};

export default Header;
