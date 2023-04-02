import { IStoreModel } from "./model.types";
import { PodcastModel } from "./podcasts/podcasts";
import { DetailsModel } from "./details/details";

export const model: IStoreModel = {
  podcasts: PodcastModel,
  details: DetailsModel,
};
