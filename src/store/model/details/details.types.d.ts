import { Action } from "easy-peasy";

export interface IDetailsModel {
  detailsList: IPodcastDetails[];

  setDetails: Action<IDetailsModel, IPodcastDetails>;
  updateDetails: Action<IDetailsModel, IPodcastDetails>;
}

export interface IPodcastDetails {
  lastFetched: Date;
  trackId: number;
  summary: string | string[] | undefined;
  results: [
    {
      //Details
      trackName: string;
      artworkUrl100: string;
      artistName: string | undefined;
      description: string | undefined;

      //Episodes
      trackCount: number | undefined;
      trackTimeMillis: number;
      releaseDate: string;
    }
  ];
}
