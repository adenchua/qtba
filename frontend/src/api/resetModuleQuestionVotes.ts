import axios from "axios";

import { API_ENDPOINT } from "../utils/constants";

export default async function resetModuleQuestionVotes(moduleId: string): Promise<void> {
  try {
    await axios.post(`${API_ENDPOINT}/modules/questions-vote-reset`, { moduleId });
    return;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
