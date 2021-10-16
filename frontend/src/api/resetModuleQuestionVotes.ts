import axios from "axios";

import { API_ENDPOINT } from "../utils/constants";

export default async function resetModuleQuestionVotes(moduleId: string): Promise<void> {
  try {
    await axios.post(`${API_ENDPOINT}/modules/questions-vote-reset`, { moduleId });
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
}
