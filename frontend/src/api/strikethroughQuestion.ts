import axios from "axios";

import { API_ENDPOINT } from "../utils/constants";

export default async function strikethroughQuestion(questionId: string): Promise<void> {
  const body = {
    questionId,
    isStrikethrough: true,
  };

  try {
    await axios.patch(`${API_ENDPOINT}/questions`, body);
    return;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
