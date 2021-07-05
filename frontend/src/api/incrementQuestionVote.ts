import axios from "axios";
import QuestionInterface from "../types/QuestionInterface";

import { API_ENDPOINT } from "../utils/constants";

export default async function incrementQuestionVote(questionId: string): Promise<QuestionInterface> {
  try {
    const response = await axios.post(`${API_ENDPOINT}/questions/votes`, { questionId });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
