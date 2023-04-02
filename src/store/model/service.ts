import { IPodcastCard } from "@/components/PodcastCard/PodcastCard.types";
import {
  API_ORIGINS_URL,
  TOP_100_ITUNES_PODCASTS_URL,
} from "@/pages/constants";
import axios from "axios";

export async function fetchPodcasts() {
  try {
    const response = await axios.get(TOP_100_ITUNES_PODCASTS_URL);
    return response.data as IPodcastCard;
  } catch (e: any) {
    console.error(e.message);
  }
}

export async function fetchPodcastsDetails(id: string | string[] | undefined) {
  const ITUNES_URL = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;

  try {
    const res = await axios.get(
      `${API_ORIGINS_URL}${encodeURIComponent(ITUNES_URL)}`
    );
    return res.data;
  } catch (e: any) {
    console.error(e.message);
  }
}
