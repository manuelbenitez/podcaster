import React from "react";
import styles from "./Episode.module.scss";
import { IEpisodesList } from "../EpisodesList/EpisodesList.types";
import { refactorDate, refactorTime } from "@/utils";

const Episode = ({ details, handleClick }: IEpisodesList) => {
  return (
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
  );
};

export default Episode;
