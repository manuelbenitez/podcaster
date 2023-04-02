import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../../styles/PodcastDetailsPage.module.scss";
import { useStoreActions, useStoreState } from "@/store";
import { fetchPodcastsDetails } from "@/store/model/service";
import { IPodcastDetails } from "@/store/model/details/details.types";
const PodcastDetailsPage = () => {
  const router = useRouter();
  const { id, summary } = router.query;

  const detailsActions = useStoreActions((actions) => actions.details);
  const detailsState = useStoreState((state) => state.details);

  const [details, setDetails] = useState<IPodcastDetails>();

  const fetchData = useCallback(async () => {
    if (detailsState.detailsList.length === 0) {
      const data = await fetchPodcastsDetails(id);
      const { results } = JSON.parse(data.contents);

      if (results) {
        detailsActions.setDetails({
          lastFetched: new Date(),
          trackId: results[0].trackId,
          results: results,
          summary: summary,
        });
      }
    } else {
      const podcastDetails = detailsState.detailsList.find(
        (detail) => detail.trackId.toString() === id
      );

      if (podcastDetails) {
        const today = new Date();
        const difference =
          podcastDetails.lastFetched?.getTime() - today.getTime();
        const totalDays = Math.abs(difference / (1000 * 3600 * 24));

        if (totalDays >= 1) {
          const data = await fetchPodcastsDetails(id);
          const { results } = JSON.parse(data.contents);

          detailsActions.updateDetails({
            lastFetched: new Date(),
            trackId: results[0].trackId,
            summary: summary,
            results: results,
          });
        }
      } else if (!podcastDetails) {
        const data = await fetchPodcastsDetails(id);
        const { results } = JSON.parse(data.contents);

        detailsActions.setDetails({
          lastFetched: new Date(),
          trackId: results[0].trackId,
          summary: summary,
          results: results,
        });
      }
    }
    const foundDetails = detailsState.detailsList.find(
      (podcastDetails) => podcastDetails.trackId.toString() === id
    );
    if (foundDetails) setDetails(foundDetails);
    else console.error("Failed to load data");
  }, [detailsActions, detailsState.detailsList, id, summary]);

  useEffect(() => {
    fetchData();
  });
  return (
    <div className={styles.page}>
      <div className={styles.details}>
        <p>Image</p>
        <p>{details?.results[0].trackName}</p>
        <p>by {details?.results[0].artistName}</p>
        <p>Description:</p>
        <p>{details?.summary}</p>
      </div>
      <div className={styles.episodes}>
        <p className={styles.count}>
          Episodes: {details?.results[0].trackCount}
        </p>

        <table>
          <thead>
            <tr>
              <th>Title </th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody className={styles.table}>
            {details?.results &&
              details?.results.map((episode, index) => {
                if (index > 0) {
                  return (
                    <tr key={index}>
                      <td>{episode.trackName}</td>
                      <td>{episode.releaseDate}</td>
                      <td>{episode.trackTimeMillis}</td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PodcastDetailsPage;
