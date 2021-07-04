import axios from "axios";
import PlatformInterface from "../types/PlatformInterface";

import { API_ENDPOINT } from "../utils/constants";

export default async function getPlatforms(): Promise<PlatformInterface[]> {
  try {
    const response = await axios.get(`${API_ENDPOINT}/platforms`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
