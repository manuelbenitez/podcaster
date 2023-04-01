import { Action } from "easy-peasy";

export interface IPodcastsModel {
  podcasts: IPodcast[];

  addPodcast: Action<IPodcastModel | IPodcast>;
}

export interface IPodcast {
  image: string;
  title: string;
  author: string;
  description: string;
}
