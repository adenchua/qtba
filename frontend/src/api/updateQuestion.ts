import axios from "axios";

import { API_ENDPOINT } from "../utils/constants";

export default async function updateQuestion(updatedQuestionTitle: string, questionId: string): Promise<void> {
  const body = {
    questionId,
    title: updatedQuestionTitle,
  };

  try {
    await axios.patch(`${API_ENDPOINT}/questions`, body);
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
}
