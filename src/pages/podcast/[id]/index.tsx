import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../../../styles/PodcastDetailsPage.module.scss";
import { useStoreActions, useStoreState } from "@/store";
import { fetchPodcastsDetails } from "@/store/model/service";
import { IPodcastDetails } from "@/store/model/details/details.types";
import Image from "next/image";
import { calculateDays, refactorDate, refactorTime } from "@/utils";
import PodcastDetails from "@/components/PodcastDetails/PodcastDetails";
const PodcastDetailsPage = () => {
  const router = useRouter();
  const { id, summary } = router.query;

  const detailsActions = useStoreActions((actions) => actions.details);
  const setIsLoading = useStoreActions(
    (actions) => actions.podcasts.setIsLoading
  );
  const isLoading = useStoreState((state) => state.podcasts.isLoading);
  const detailsState = useStoreState((state) => state.details);

  const [details, setDetails] = useState<IPodcastDetails>();

  const handleClick = (episode: any) => {
    router.push(
      {
        pathname: `/podcast/${id}/episode/${episode.trackId}`,
        query: {
          trackName: details?.results[0].trackName,
          artistName: details?.results[0].artistName,
          summary: details?.summary,
          artworkUrl100: details?.results[0].artworkUrl100,
          previewUrl: episode.previewUrl,
          description: episode.description,
          title: episode.trackName,
          id: id,
        },
      },
      `/podcast/${id}/episode/${episode.trackId}`
    );
  };
  const fetchData = useCallback(async () => {
    setIsLoading(true);
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
    if (foundDetails) {
      setIsLoading(false);
      setDetails(foundDetails);
    } else console.error("Failed to load data");
  }, [detailsActions, detailsState.detailsList, id, setIsLoading, summary]);

  useEffect(() => {
    fetchData();
  });

  return (
    <div className={styles.page}>
      {details && !isLoading && (
        <>
          <PodcastDetails
            trackName={details?.results[0].trackName}
            artistName={details?.results[0].artistName}
            summary={details?.summary}
            artworkUrl100={details?.results[0].artworkUrl100}
            id={id ? id : ""}
          />
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
