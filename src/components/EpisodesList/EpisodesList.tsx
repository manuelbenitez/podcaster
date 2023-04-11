import React from "react";
import { IEpisodesList } from "./EpisodesList.types";
import styles from "./EpisodesList.module.scss";
import Episode from "../Episode/Episode";

const EpisodesList = ({ details, handleClick }: IEpisodesList) => {
  const EpisodesCount = () => (
    <h4 className={styles.count}>Episodes: {details?.results[0].trackCount}</h4>
  );

  const TableHead = () => (
    <thead>
      <tr>
        <th className={styles.title}>Title</th>
        <th className={styles.title}>Date</th>
        <th>Duration</th>
      </tr>
    </thead>
  );
  return (
    <div className={styles.episodes}>
      <EpisodesCount />

      <table className={styles.table}>
        <TableHead />
        <Episode details={details} handleClick={handleClick} />
      </table>
    </div>
  );
};

export default EpisodesList;
