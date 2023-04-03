import React from "react";
import styles from "../../../styles/PodcastDetailsPage.module.scss";
import { useRouter } from "next/router";
import { useStoreActions, useStoreState } from "@/store";
import { refactorDate, refactorTime } from "@/utils";
import PodcastDetails from "@/components/PodcastDetails/PodcastDetails";
import useFetchPodcastDetails from "@/utils/useFetchPodcastDetails";

const PodcastDetailsPage = () => {
  const router = useRouter();
  const { id, summary } = router.query;
  const foundDetails = useFetchPodcastDetails(id, summary);
  const isLoading = useStoreState((state) => state.podcasts.isLoading);

  const handleClick = (episode: any) => {
    router.push(
      {
        pathname: `/podcast/${id}/episode/${episode.trackId}`,
        query: {
          trackName: foundDetails?.results[0].trackName,
          artistName: foundDetails?.results[0].artistName,
          summary: foundDetails?.summary,
          artworkUrl100: foundDetails?.results[0].artworkUrl100,
          previewUrl: episode.previewUrl,
          description: episode.description,
          title: episode.trackName,
          id: id,
        },
      },
      `/podcast/${id}/episode/${episode.trackId}`
    );
  };
  return (
    <div className={styles.page}>
      {foundDetails && !isLoading && (
        <>
          <PodcastDetails
            trackName={foundDetails?.results[0].trackName}
            artistName={foundDetails?.results[0].artistName}
            summary={foundDetails?.summary}
            artworkUrl100={foundDetails?.results[0].artworkUrl100}
            id={id ? id : ""}
          />
          <div className={styles.episodes}>
            <h4 className={styles.count}>
              Episodes: {foundDetails?.results[0].trackCount}
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
                {foundDetails?.results &&
                  foundDetails?.results.map((episode, index) => {
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
