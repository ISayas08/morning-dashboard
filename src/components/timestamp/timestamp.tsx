"use client";
import React, { useEffect, useState } from "react";

import styles from "./timestamp.module.scss";

const Timestamp: React.FC = () => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) {
    return (
      <div className={styles.timestamp} aria-hidden="true">
        <div className={styles.weekday}>—</div>
        <div className={styles.dateLine}>
          <span className={styles.dateText}>— —, —</span>
          <span className={styles.sep}> — </span>
          <time className={styles.clock}>—:—:—</time>
        </div>
      </div>
    );
  }

  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    now
  );
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    now
  );
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);

  return (
    <div className={styles.timestamp}>
      <div className={styles.weekday}>{weekday}</div>
      <div className={styles.dateLine}>
        <span className={styles.dateText}>
          {monthName} {day}, {year}
        </span>
        <span className={styles.sep}> — </span>
        <time
          className={styles.clock}
          dateTime={now.toISOString()}
          suppressHydrationWarning
        >
          {time}
        </time>
      </div>
    </div>
  );
};

export default Timestamp;
