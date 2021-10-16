import axios from "axios";
import QuestionInterface from "../types/QuestionInterface";

import { API_ENDPOINT } from "../utils/constants";

export default async function incrementQuestionVote(questionId: string): Promise<QuestionInterface> {
  try {
    const response = await axios.post(`${API_ENDPOINT}/questions/votes`, { questionId });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Axios Error");
    } else {
      throw new Error("Unexpected Error");
    }
  }
}
