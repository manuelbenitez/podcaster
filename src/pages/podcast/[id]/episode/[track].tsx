import PodcastDetails from "@/components/PodcastDetails/PodcastDetails";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import styles from "../../../../styles/PodcastDetailsPage.module.scss";
import { IEpisode } from "./episode.types";
const EpisodeDetails = () => {
  const router = useRouter();
  const {
    trackName,
    artistName,
    summary,
    artworkUrl100,
    id,
    previewUrl,
    title,
    description,
  } = router.query;

  const [episode, setEpisode] = useState<IEpisode>();
  useEffect(() => {
    setEpisode({
      trackId: id as string,
      trackName: title as string,
      description: description as string,
      previewUrl: previewUrl as string,
    });
  }, [description, id, previewUrl, title]);

  return (
    <div className={styles.page}>
      <PodcastDetails
        trackName={trackName}
        artistName={artistName}
        summary={summary}
        artworkUrl100={artworkUrl100 ? (artworkUrl100 as string) : ""}
        id={id ? id : ""}
      />

      {episode && (
        <div className={styles.episodePlayer}>
          <h1>{episode.trackName}</h1>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {episode.description}
          </ReactMarkdown>
          <audio controls>
            <source src={episode?.previewUrl} type={"audio/ogg"} />
            <source src={episode?.previewUrl} type={"audio/mpeg"} />
          </audio>
        </div>
      )}
    </div>
  );
};

export default EpisodeDetails;
