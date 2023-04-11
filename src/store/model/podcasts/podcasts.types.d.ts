import { IPodcastCard } from "@/components/PodcastCard/PodcastCard.types";
import { Action, Thunk } from "easy-peasy";

export interface IPodcastsModel {
  /**
   * Podcasts cards to be displayed on home page
   */
  podcasts: IPodcastCard;
  /**
   * Date of the last time data was fetched
   */
  lastFetched: Date;
  /**
   * Condition for the first time podcasts have been fetched
   */
  firstTimeFetch: boolean;
  /**
   * Condition to display loading message on the Navbar every time data is being fetched
   */
  isLoading: boolean;
  /**
   * Value of the filter input on the home page
   */
  value: string;
  /**
   * Filter count
   */
  filterCount: number;

  /**
   * Action triggered set filter input value
   */
  setValue: Action<IPodcastsModel, string>;
  /**
   * Action triggered everytime data is being fetched and when data has been fetched
   */
  setIsLoading: Action<IPodcastsModel, boolean>;
  /**
   * Action triggered to set podcasts list
   */
  setPodcasts: Action<IPodcastModel, IPodcastCard>;
  /**
   * Action triggered to store last time podcasts have been fetched
   */
  setLastFetched: Action<IPodcastsModel, Date>;
  /**
   * Action triggered to set state of the first time items have been fetched
   */
  setFirstTimeFetch: Action<IPodcastsModel, boolean>;
  /**
   * Action triggered to set state of filter count
   */
  setFilterCount: Action<IPodcastsModel, number>;
}
