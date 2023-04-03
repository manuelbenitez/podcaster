import { IDetailsModel } from "./details/details.types";
import { IPodcastsModel } from "./podcasts/podcasts.types";
export interface IStoreModel {
  /**
   * Podcasts list model
   */
  podcasts: IPodcastsModel;
  /**
   * Podcast details model
   */
  details: IDetailsModel;
}
