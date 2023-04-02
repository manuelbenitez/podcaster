import React from "react";
import { IPodcastDetailsProps } from "./PodcastDetails.types";
import Image from "next/image";
import styles from "./PodcastDetails.module.scss";
import { useRouter } from "next/router";

const PodcastDetails = ({
  artistName,
  trackName,
  summary,
  artworkUrl100,
  id,
}: IPodcastDetailsProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/podcast/${id}`);
  };
  return (
    <div className={styles.details} onClick={handleClick}>
      <Image
        src={artworkUrl100}
        alt=""
        width={100}
        height={100}
        className={styles.image}
      />
      <div className={styles.artist}>
        <h5>{trackName}</h5>
        <p className={styles.description}>by {artistName}</p>
      </div>
      <div>
        <h6>Description:</h6>
        <p className={styles.description}>{summary}</p>
      </div>
    </div>
  );
};

export default PodcastDetails;
