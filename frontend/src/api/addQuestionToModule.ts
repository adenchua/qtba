import axios from "axios";
import QuestionInterface from "../types/QuestionInterface";

import { API_ENDPOINT } from "../utils/constants";

export default async function addQuestionToModule(title: string, moduleId: string): Promise<QuestionInterface> {
  try {
    const response = await axios.post(`${API_ENDPOINT}/questions`, { title, moduleId });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
