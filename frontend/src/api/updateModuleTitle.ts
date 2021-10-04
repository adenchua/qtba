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
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
