import { IPodcastCard } from "@/components/PodcastCard/PodcastCard.types";
import { Action, Thunk } from "easy-peasy";

export interface IPodcastsModel {
  podcasts: IPodcastCard;
  lastFechted: Date;
  firstTimeFetch: boolean;
  isLoading: boolean;
  value: string;

  setValue: Action<IPodcastsModel, string>;
  setIsLoading: Action<IPodcastsModel, boolean>;
  setPodcasts: Action<IPodcastModel, IPodcastCard>;
  setLastFetched: Action<IPodcastsModel, Date>;
  setFirstTimeFetch: Action<IPodcastsModel, boolean>;
}
