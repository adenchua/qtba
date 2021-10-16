import axios from "axios";
import ModuleInterface from "../types/ModuleInterface";

import { API_ENDPOINT } from "../utils/constants";

export default async function addModuleToPlatform(title: string, platformId: string): Promise<ModuleInterface> {
  try {
    const response = await axios.post(`${API_ENDPOINT}/modules`, { title, platformId });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
}
