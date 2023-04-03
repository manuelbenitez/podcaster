import React from "react";
import styles from "../../../styles/PodcastDetailsPage.module.scss";
import { useRouter } from "next/router";
import { useStoreState } from "@/store";
import PodcastDetails from "@/components/PodcastDetails/PodcastDetails";
import useFetchPodcastDetails from "@/utils/useFetchPodcastDetails";
import EpisodesList from "@/components/EpisodesList/EpisodesList";

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
          <EpisodesList details={foundDetails} handleClick={handleClick} />
        </>
      )}
    </div>
  );
};

export default PodcastDetailsPage;
