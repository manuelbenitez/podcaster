export interface IPodcastDetailsProps {
  /**
   * Name of the podcast
   */
  trackName: string | string[] | undefined;
  /**
   * Name of the artist
   */
  artistName: string | string[] | undefined;
  /**
   * Description of the podcast
   */
  summary: string | string[] | undefined;
  /**
   * Image cover of the podcast
   */
  artworkUrl100: string;
  /**
   * ID of the podcast
   */
  id: string | string[];
}
