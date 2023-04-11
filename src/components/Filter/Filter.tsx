import { useStoreActions, useStoreState } from "@/store";
import React, { useCallback, useEffect, useState } from "react";
import { IEntry } from "../PodcastCard/PodcastCard.types";
import styles from "./Filter.module.scss";
import { IFilterProps } from "./Filter.types";

function Filter({ entry }: IFilterProps) {
  const [filteredEntries, setFilteredEntries] = useState<Array<IEntry>>([]);

  const setValue = useStoreActions((actions) => actions.podcasts.setValue);
  const value = useStoreState((state) => state.podcasts.value);

  useEffect(() => {
    const newEntries = entry.filter(
      (podcast: IEntry) =>
        podcast["im:artist"].label
          .toLocaleLowerCase()
          .includes(value.toLowerCase()) ||
        podcast["im:name"].label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEntries(newEntries);
  }, [entry, value]);

  return (
    <div className={styles.filterContainer}>
      {filteredEntries ? filteredEntries.length : entry.length}
      <input
        placeholder="Filter podcasts..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}

export default Filter;
