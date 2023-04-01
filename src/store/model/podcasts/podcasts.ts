import { action } from "easy-peasy";
import { IPodcastsModel } from "./podcasts.types";

export const PodcastModel: IPodcastsModel = {
  podcasts: [],
  addPodcast: action((state, payload) => {
    state.podcasts.push(payload);
  }),
};
