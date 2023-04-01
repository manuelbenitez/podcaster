import { TOP_100_ITUNES_PODCASTS_URL } from "@/pages/constants";
import axios from "axios";

export async function fetchPodcasts() {
  try {
    const response = await axios.get(TOP_100_ITUNES_PODCASTS_URL);
    return response.data;
  } catch (e: any) {
    console.error(e.message);
  }
}
