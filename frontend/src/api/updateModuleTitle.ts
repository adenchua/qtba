import axios from "axios";

import { API_ENDPOINT } from "../utils/constants";

export default async function updateModuleTitle(moduleId: string, title: string): Promise<void> {
  const body = {
    moduleId,
    title,
  };

  try {
    await axios.patch(`${API_ENDPOINT}/modules`, body);
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
}
