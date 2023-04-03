import { IPodcastDetails } from "@/store/model/details/details.types";

export interface IEpisodesList {
  details: IPodcastDetails;
  handleClick: (episode: any) => void;
}
