import React from "react";

import styles from "./weather-card.module.scss";

type Props = { count?: number; isRenderingPhotos: boolean };

const WeatherSkeleton: React.FC<Props> = ({ count = 6, isRenderingPhotos }) => {
  return (
    <section
      className={styles.weather}
      aria-label="Loading current weather"
      style={{ marginTop: isRenderingPhotos ? 20 : 200 }}
    >
      <h2 className={styles.weatherTitle}>Your weather report</h2>
      <div className={styles.weatherContainer}>
        {Array.from({ length: count }).map((_, i) => (
          <article className={styles.weatherItem} key={i} aria-hidden="true">
            <div className={styles.weatherIconWrap}>
              <div className={`${styles.skIcon} ${styles.skShimmer}`} />
            </div>
            <div className={styles.weatherItemContent}>
              <div className={styles.weatherValue}>
                <div className={`${styles.skValue} ${styles.skShimmer}`} />
                <div className={`${styles.skUnit} ${styles.skShimmer}`} />
              </div>
              <div className={`${styles.skLabel} ${styles.skShimmer}`} />
              <div className={`${styles.skHelp} ${styles.skShimmer}`} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WeatherSkeleton;
