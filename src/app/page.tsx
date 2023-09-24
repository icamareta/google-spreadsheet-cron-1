"use client";

import styles from "./page.module.css";
import { ButtonHTMLAttributes, useState } from "react";
import { getValues } from "../actions/function-xyz";

export default function Home() {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(1);

  const handleMinMaxVal = async () => {
    await fetch(
      "https://google-spreadsheet-cron-1.vercel.app/api?min-val=" +
        minVal +
        "&max-val=" +
        maxVal
    ).then((value) => {
      console.log("value");
      console.log(value);
    }).catch((error) => {
      console.log("error")
      console.log(error)
    });
  };

  return (
    <main className={styles.main}>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <input
          type="text"
          name=""
          id=""
          value={minVal}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMinVal(+event.target.value);
          }}
          placeholder="min value"
        />
        <input
          type="text"
          name=""
          id=""
          value={maxVal}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMaxVal(+event.target.value);
          }}
          placeholder="max value"
        />
        <button type="button" onClick={() => handleMinMaxVal()}>
          Send Mail
        </button>
      </div>
    </main>
  );
}
