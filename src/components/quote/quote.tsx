import React from "react";
import styles from "./quote.module.scss";

interface QuoteProps {
  text: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ text, author }) => {
  return (
    <section aria-labelledby="quote-section" className={styles.quoteSection}>
      <h2 id="quote-section" className="sr-only">
        Quote of the day
      </h2>

      <blockquote lang="en" className={styles.quote}>
        <span aria-hidden={true} className={styles.quoteMark}>
          &ldquo;
        </span>
        <p className={styles.quoteText}>{text}</p>
        <footer className={styles.quoteAuthor}>— {author}</footer>
      </blockquote>
    </section>
  );
};

export default Quote;
