import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { IEntry, IPodcastCard } from "./PodcastCard.types";
import styles from "./PodcastCard.module.scss";
import { useRouter } from "next/router";
import Filter from "../Filter/Filter";
import { useStoreState } from "@/store";

const PodcastCards = ({ feed }: IPodcastCard) => {
  const { entry } = feed;
  const router = useRouter();

  const value = useStoreState((state) => state.podcasts.value);

  const handleClick = (id: string, summary: string) => {
    router.push(
      { pathname: `/podcast/${id}`, query: { summary: summary } },
      `/podcast/${id}`
    );
  };

  return (
    <div className={styles.page}>
      <Filter entry={entry} />
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
