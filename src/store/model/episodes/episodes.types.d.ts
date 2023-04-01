export interface IEpisodesModel {
  episodes: IEpisodes[];
}

export interface IEpisodes {
  title: string;
  duration: number;
  releasedDate: string;
}
