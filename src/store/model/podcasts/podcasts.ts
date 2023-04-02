import { action, thunk } from "easy-peasy";
import { fetchPodcasts } from "../service";
import { IPodcastsModel } from "./podcasts.types";

export const PodcastModel: IPodcastsModel = {
  podcasts: {
    feed: {
      entry: [
        {
          id: { label: "", attributes: { "im:id": "" } },
          "im:artist": { label: "" },
          "im:image": [{ label: "" }],
          "im:name": { label: "" },
          "im:price": { label: "" },
          summary: { label: "" },
        },
      ],
    },
  },

  firstTimeFetch: false,
  lastFechted: new Date(),

  setPodcasts: action((state, payload) => {
    state.podcasts = payload;
  }),

  setLastFetched: action((state, payload) => {
    state.lastFechted = payload;
  }),
  setFirstTimeFetch: action((state, payload) => {
    state.firstTimeFetch = payload;
  }),
};
