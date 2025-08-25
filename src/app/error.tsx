"use client";

import { useEffect } from "react";
import styles from "./page.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // log error to monitoring tools (out of scope)
    console.error(error);
  }, [error]);

  return (
    <main className={styles.shell}>
      <div style={{ marginTop: "100px" }}>
        <h1>
          Oops, the site's caught in a thunderstorm—please stand by for clearer
          skies!
        </h1>
        <button
          style={{ padding: "10px 20px", cursor: "pointer", marginTop: "15px" }}
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
