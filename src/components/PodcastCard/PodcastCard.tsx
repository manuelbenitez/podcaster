import Image from "next/image";
import React from "react";
import { IPodcastCard } from "./PodcastCard.types";
import styles from "./PodcastCard.module.scss";

const PodcastCard = ({ feed }: IPodcastCard) => {
  const { entry } = feed;
  return (
    <>
      {feed.entry &&
        feed.entry.map((podcast, index) => (
          <div key={index} className={styles.podcastCard}>
            <Image
              src={podcast["im:image"][0].label}
              alt=""
              width={20}
              height={20}
            />
            <p>{podcast["im:name"].label}</p>
            <p>Author: {podcast["im:artist"].label}</p>
          </div>
        ))}
    </>
  );
};

export default PodcastCard;
