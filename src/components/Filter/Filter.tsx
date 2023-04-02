import React from "react";
import styles from "./Filter.module.scss";
import { IFilterProps } from "./Filter.types";
function Filter({ onChange, podcastCount, value }: IFilterProps) {
  return (
    <div className={styles.filterContainer}>
      {podcastCount}
      <input
        placeholder="Filter podcasts..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        className={styles.input}
      />
    </div>
  );
}

export default Filter;
