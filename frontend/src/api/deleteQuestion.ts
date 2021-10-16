import axios from "axios";

import { API_ENDPOINT } from "../utils/constants";

export default async function deleteQuestion(questionId: string): Promise<void> {
  const body = {
    questionId,
  };

  try {
    await axios.delete(`${API_ENDPOINT}/questions`, { data: body });
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
}
