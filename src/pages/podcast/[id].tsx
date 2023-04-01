import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { API_ORIGINS_URL } from "../constants";
import styles from "../../styles/PodcastDetailsPage.module.scss";
import { IEpisodes } from "./PodcastDetailsPage.types";

const PodcastDetailsPage = () => {
  const router = useRouter();

  const [podcastDetails, setPodcastDetails] = useState<any>();
  const [episodesCount, setEpisodesCount] = useState<number>();
  const [episodes, setEpisodes] = useState<Array<IEpisodes>>([]);
  const { id } = router.query;

  const ITUNES_URL = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;

  const fetchPodcastDetails = async () => {
    try {
      const res = await fetch(
        `${API_ORIGINS_URL}${encodeURIComponent(ITUNES_URL)}`
      );

      const data = await res.json();

      if (data) {
        const parsedData = JSON.parse(data.contents);

        console.log(parsedData);

        setEpisodesCount(parsedData.resultCount - 1);

        parsedData.results &&
          parsedData.results.forEach((episode: IEpisodes, index: number) => {
            if (index > 0) {
              setEpisodes([
                ...episodes,
                {
                  trackName: episode.trackName,
                  releaseDate: episode.releaseDate,
                  trackTimeMillis: episode.trackTimeMillis,
                },
              ]);
            }
          });
      }
    } catch (e: any) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchPodcastDetails();
  }, []);
  return (
    <div className={styles.page}>
      <div className={styles.details}>
        <p>Image</p>
        <p>Name</p>
        <p>Description</p>
      </div>
      <div className={styles.episodes}>
        <p className={styles.count}>Episodes: {episodesCount}</p>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody className={styles.table}>
            {episodes.length > 0 &&
              episodes.map((episode, index) => (
                <tr key={index}>
                  <td>{episode.trackName}</td>
                  <td>{episode.releaseDate}</td>
                  <td>{episode.trackTimeMillis}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PodcastDetailsPage;
