import { IStoreModel } from "./model.types";
import { PodcastModel } from "./podcasts/podcasts";

export const model: IStoreModel = {
  podcasts: PodcastModel,
};
