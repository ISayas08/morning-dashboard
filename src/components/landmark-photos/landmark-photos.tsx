import React from "react";
import { LandMarkPhoto } from "@lib/types";

import styles from "./landmark-photos.module.scss";
import Timestamp from "@components/timestamp/timestamp";

const LandmarkPhotos: React.FC<{
  landmarkPhotos: LandMarkPhoto[] | null | undefined;
}> = ({ landmarkPhotos }) => {
  const showPhotos = landmarkPhotos?.length;
  return (
    <section className={styles.landmarkPhotos}>
      {showPhotos && (
        <div className={styles.landmarkPhotosContainer}>
          {landmarkPhotos.map(({ id, urlRegular, urlSmall, alt }) => (
            <picture
              className={styles.landmarkPhotosImageContainer}
              key={`${id}-${urlSmall}`}
            >
              <source media="(min-width: 767px)" srcSet={urlRegular} />
              <img
                className={styles.landmarkPhotosImage}
                src={urlSmall}
                alt={alt}
              />
            </picture>
          ))}
        </div>
      )}
      <div
        className={`${styles.landmarkPhotosTimestamp} ${
          showPhotos ? styles["landmarkPhotosTimestamp--moved-top"] : ""
        }`}
      >
        <Timestamp />
      </div>
    </section>
  );
};

export default LandmarkPhotos;
