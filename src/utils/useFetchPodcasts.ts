import { useStoreActions, useStoreState } from "@/store";
import { useEffect } from "react";
import { calculateDays } from ".";
import { TOP_100_ITUNES_PODCASTS_URL } from "./constants";

/**
 * Function to fetch TOP 100 ITunes podcasts and store them in the global state of the application
 */
const useFetchPodcasts = () => {
  const actions = useStoreActions((action) => action.podcasts);
  const state = useStoreState((state) => state.podcasts);

  const totalDays = calculateDays(state.lastFetched);
  useEffect(() => {
    if (state.firstTimeFetch === false || totalDays >= 1) {
      fetch(TOP_100_ITUNES_PODCASTS_URL)
        .then((res) => res.json())
        .then((data) => {
          actions.setFirstTimeFetch(true);
          actions.setPodcasts(data);
          actions.setLastFetched(new Date());
          data.error && console.error(data.error);
        });
      actions.setIsLoading(false);
    }
  }, [actions, state.firstTimeFetch, totalDays]);
};

export default useFetchPodcasts;
