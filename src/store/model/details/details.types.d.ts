import { Action } from "easy-peasy";

export interface IDetailsModel {
  /**
   * Podcast details list used to store details that have been fetched
   */
  detailsList: IPodcastDetails[];

  /**
   * Action triggered to add a podcast details to the list
   */
  setDetails: Action<IDetailsModel, IPodcastDetails>;
  /**
   * Action triggered to update a podcast if it has been more than 24 hours since last fetch
   */
  updateDetails: Action<IDetailsModel, IPodcastDetails>;
}

export interface IPodcastDetails {
  lastFetched: Date;
  trackId: number;
  summary: string | string[] | undefined;
  results: [
    {
      trackName: string;
      artworkUrl100: string;
      artistName: string | undefined;
      description: string | undefined;
      trackCount: number | undefined;
      trackTimeMillis: number;
      releaseDate: string;
      trackId: number;
    }
  ];
}
