import React from "react";

import styles from "./homepage.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1
        style={{
          "padding-top": "2rem",
          "padding-bottom": "3rem",
        }}
      >
        404 Not Found
      </h1>
      <p>This page does not exist. Please check the URL and try again.</p>
    </div>
  );
}
