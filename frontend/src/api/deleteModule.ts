import axios from "axios";

import { API_ENDPOINT } from "../utils/constants";

export default async function deleteModule(moduleId: string): Promise<void> {
  const body = {
    moduleId,
  };

  try {
    await axios.delete(`${API_ENDPOINT}/modules`, { data: body });
    return;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
