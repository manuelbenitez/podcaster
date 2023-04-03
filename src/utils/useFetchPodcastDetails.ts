import { useStoreActions, useStoreState } from "@/store";
import { useEffect } from "react";
import { calculateDays } from ".";
import { API_ORIGINS_URL } from "./constants";

const useFetchPodcastDetails = (
  id: string | string[] | undefined,
  summary: string | string[] | undefined
) => {
  const ITUNES_URL = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;

  const actions = useStoreActions((actions) => actions.details);
  const state = useStoreState((state) => state.details);

  const setIsLoading = useStoreActions(
    (actions) => actions.podcasts.setIsLoading
  );

  useEffect(() => {
    if (state.detailsList.length === 0) {
      fetch(`${API_ORIGINS_URL}${encodeURIComponent(ITUNES_URL)}`)
        .then((res) => res.json())
        .then((data) => {
          const { contents } = data;
          const { results } = JSON.parse(contents);
          actions.setDetails({
            lastFetched: new Date(),
            trackId: results[0].trackId,
            results: results,
            summary: summary,
          });

          setIsLoading(false);
          data.error && console.error(data.error);
        });
    } else {
      const foundPodcast = state.detailsList.find(
        (details) => details.trackId.toString() === id
      );
      if (foundPodcast) {
        const totalDays = calculateDays(foundPodcast.lastFetched);

        if (totalDays >= 1) {
          fetch(`${API_ORIGINS_URL}${encodeURIComponent(ITUNES_URL)}`)
            .then((res) => res.json())
            .then((data) => {
              const { contents } = data;
              const { results } = JSON.parse(contents);

              actions.setDetails({
                lastFetched: new Date(),
                trackId: results[0].trackId,
                results: results,
                summary: summary,
              });

              setIsLoading(false);
              data.error && console.error(data.error);
            });
        }
      } else if (!foundPodcast) {
        fetch(`${API_ORIGINS_URL}${encodeURIComponent(ITUNES_URL)}`)
          .then((res) => res.json())
          .then((data) => {
            const { contents } = data;
            const { results } = JSON.parse(contents);

            actions.setDetails({
              lastFetched: new Date(),
              trackId: results[0].trackId,
              results: results,
              summary: summary,
            });

            setIsLoading(false);
            data.error && console.error(data.error);
          });
      }
    }
  }, [ITUNES_URL, actions, id, setIsLoading, state.detailsList, summary]);

  const found = state.detailsList.find(
    (details) => details.trackId.toString() === id
  );
  if (found) {
    return found;
  }
};

export default useFetchPodcastDetails;
