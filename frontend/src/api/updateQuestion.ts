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
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
