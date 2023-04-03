import { IPodcastDetails } from "@/store/model/details/details.types";

export interface IEpisodesList {
  /**
   * Podcast details
   */
  details: IPodcastDetails;
  /**
   * Function to handle episode click
   *
   * @param {any} episode - Episode object
   */
  handleClick: (episode: any) => void;
}
