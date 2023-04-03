export interface IPodcastCard {
  /**
   * List of podcasts
   */
  feed: {
    entry: IEntry[];
  };
}

export interface IEntry {
  /**
   * ID of the podcast
   */
  id: { label: string; attributes: { "im:id": string } };
  /**
   * Podcasts Artist name
   */
  "im:artist": { label: string };
  /**
   * Podcasts Image
   */
  "im:image": [{ label: string }];
  /**
   * Podcasts Name
   */
  "im:name": { label: string };
  /**
   * Description of the podcast
   */
  summary: { label: string };
}
