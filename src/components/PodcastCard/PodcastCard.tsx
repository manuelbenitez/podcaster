import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { IEntry, IPodcastCard } from "./PodcastCard.types";
import styles from "./PodcastCard.module.scss";
import { useRouter } from "next/router";
import Filter from "../Filter/Filter";

const PodcastCards = ({ feed }: IPodcastCard) => {
  const { entry } = feed;
  const router = useRouter();

  const [value, setValue] = useState<string>("");
  const [filteredEntries, setFilteredEntries] = useState<Array<IEntry>>([]);

  const handleClick = (id: string, summary: string) => {
    router.push(
      { pathname: `/podcast/${id}`, query: { summary: summary } },
      `/podcast/${id}`
    );
  };

  const handleChange = useCallback(
    (filter: string) => {
      setValue(filter);

      const newEntries = entry.filter(
        (podcast: IEntry) =>
          podcast["im:artist"].label
            .toLocaleLowerCase()
            .includes(value.toLowerCase()) ||
          podcast["im:name"].label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEntries(newEntries);
    },
    [entry, value]
  );

  useEffect(() => {
    handleChange(value);
  }, [handleChange, value]);

  return (
    <div className={styles.page}>
      <Filter
        podcastCount={filteredEntries ? filteredEntries.length : entry.length}
        onChange={handleChange}
        value={value}
      />
      <div className={styles.container}>
        {entry &&
          entry.map((podcast: IEntry, index: number) => {
            if (
              (value &&
                podcast["im:artist"].label
                  .toLowerCase()
                  .includes(value.toLowerCase())) ||
              podcast["im:name"].label
                .toLowerCase()
                .includes(value.toLowerCase())
            ) {
              return (
                <div
                  key={index}
                  className={styles.podcastCard}
                  onClick={() =>
                    handleClick(
                      podcast.id.attributes["im:id"],
                      podcast.summary.label
                    )
                  }
                >
                  <Image
                    src={podcast["im:image"][0].label}
                    alt=""
                    width={100}
                    height={100}
                    className={styles.image}
                  />
                  <h1>{podcast["im:name"].label}</h1>
                  <p>Author: {podcast["im:artist"].label}</p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default PodcastCards;
