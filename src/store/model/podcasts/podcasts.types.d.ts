import { IPodcastCard } from "@/components/PodcastCard/PodcastCard.types";
import { Action, Thunk } from "easy-peasy";

export type AppService = {
  fetchPodcasts: () => Promise<IPodcastCard>;
};
export interface IPodcastsModel {
  podcasts: IPodcastCard;
  lastFechted: Date;
  firstTimeFetch: boolean;

  setPodcasts: Action<IPodcastModel, IPodcastCard>;
  setLastFetched: Action<IPodcastsModel, Date>;
  setFirstTimeFetch: Action<IPodcastsModel, boolean>;
}
