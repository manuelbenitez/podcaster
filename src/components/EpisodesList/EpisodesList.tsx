import React from "react";
import { IEpisodesList } from "./EpisodesList.types";
import styles from "./EpisodesList.module.scss";
import { refactorDate, refactorTime } from "@/utils";

const EpisodesList = ({ details, handleClick }: IEpisodesList) => {
  return (
    <div className={styles.episodes}>
      <h4 className={styles.count}>
        Episodes: {details?.results[0].trackCount}
      </h4>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.title}>Title</th>
            <th className={styles.title}>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {details?.results &&
            details?.results.map((episode, index) => {
              if (index > 0) {
                return (
                  <tr
                    key={index}
                    className={styles.episode}
                    onClick={() => handleClick(episode)}
                  >
                    <td className={styles.trackname}>{episode.trackName}</td>
                    <td>{refactorDate(episode.releaseDate)}</td>
                    <td className={styles.time}>
                      {refactorTime(episode.trackTimeMillis)}
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EpisodesList;
