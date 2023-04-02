import { IDetailsModel } from "./details/details.types";
import { IPodcastsModel } from "./podcasts/podcasts.types";
export interface IStoreModel {
  podcasts: IPodcastsModel;
  details: IDetailsModel;
}
