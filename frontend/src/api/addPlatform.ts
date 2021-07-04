import axios from "axios";
import PlatformInterface from "../types/PlatformInterface";

import { API_ENDPOINT } from "../utils/constants";

export default async function addPlatform(title: string): Promise<PlatformInterface> {
  try {
    const response = await axios.post(`${API_ENDPOINT}/platforms`, { title });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
