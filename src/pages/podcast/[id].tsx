import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../../styles/PodcastDetailsPage.module.scss";
import { useStoreActions, useStoreState } from "@/store";
import { fetchPodcastsDetails } from "@/store/model/service";
import { IPodcastDetails } from "@/store/model/details/details.types";
import Image from "next/image";
import { calculateDays, refactorDate, refactorTime } from "@/utils";
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
        const totalDays = calculateDays(podcastDetails.lastFetched);

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
  console.log(details);
  return (
    <div className={styles.page}>
      {details && (
        <>
          <div className={styles.details}>
            <Image
              src={details?.results[0].artworkUrl100}
              alt=""
              width={100}
              height={100}
              className={styles.image}
            />
            <div className={styles.artist}>
              <h5>{details?.results[0].trackName}</h5>
              <p className={styles.description}>
                by {details?.results[0].artistName}
              </p>
            </div>
            <div>
              <h6>Description:</h6>
              <p className={styles.description}>{details?.summary}</p>
            </div>
          </div>
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
                        <tr key={index} className={styles.episode}>
                          <td className={styles.trackname}>
                            {episode.trackName}
                          </td>
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
        </>
      )}
    </div>
  );
};

export default PodcastDetailsPage;
