import Image from "next/image";
import React from "react";
import { IPodcastCard } from "./PodcastCard.types";
import styles from "./PodcastCard.module.scss";
import { useRouter } from "next/router";

const PodcastCards = ({ feed }: IPodcastCard) => {
  const { entry } = feed;
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/podcast/${id}`);
  };
  return (
    <div className={styles.container}>
      {entry &&
        entry.map((podcast, index) => (
          <div
            key={index}
            className={styles.podcastCard}
            onClick={() => handleClick(podcast.id.attributes["im:id"])}
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
        ))}
    </div>
  );
};

export default PodcastCards;
