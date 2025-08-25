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

  // Fallback for SSR
  if (!now) {
    return (
      <div className={styles.timestamp} aria-hidden="true">
        <div className={styles.timestampWeekday}>—</div>
        <div className={styles.timestampDateLine}>
          <span className={styles.timestampDateText}>— —, —</span>
          <span className={styles.timestampSeparator}> — </span>
          <time className={styles.timestampClock}>—:—:—</time>
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
      <div className={styles.timestampWeekday}>{weekday}</div>
      <div className={styles.timestampDateLine}>
        <span className={styles.timestampDateText}>
          {monthName} {day}, {year}
        </span>
        <span className={styles.timestampSeparator}> — </span>
        <time className={styles.timestampClock} dateTime={now.toISOString()}>
          {time}
        </time>
      </div>
    </div>
  );
};

export default Timestamp;
