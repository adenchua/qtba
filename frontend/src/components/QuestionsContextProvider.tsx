import React, { createContext, useState, ReactNode } from "react";
import QuestionInterface from "../types/QuestionInterface";

interface QuestionsContextProviderProps {
  children: ReactNode;
}

type QuestionsContextStateType = {
  questions: QuestionInterface[];
  addQuestion: (newQuestion: QuestionInterface) => void;
  editQuestion: (editedQuestion: QuestionInterface) => void;
  deleteQuestion: (questionId: string) => void;
  setQuestions: (questions: QuestionInterface[]) => void;
  resetAllQuestionVotes: () => void;
};

const questionsContextDefaultValues: QuestionsContextStateType = {
  questions: [],
  addQuestion: () => {},
  editQuestion: () => {},
  deleteQuestion: () => {},
  setQuestions: () => {},
  resetAllQuestionVotes: () => {},
};

export const QuestionsContext = createContext<QuestionsContextStateType>(questionsContextDefaultValues);

const QuestionsContextProvider = ({ children }: QuestionsContextProviderProps): JSX.Element => {
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);

  const addQuestion = (newQuestion: QuestionInterface): void => {
    setQuestions((questions) => [...questions, newQuestion]);
  };

  const editQuestion = (editedQuestion: QuestionInterface): void => {
    const { _id: editedQuestionId } = editedQuestion;
    setQuestions((prevState) =>
      prevState.map((question) => {
        if (question._id === editedQuestionId) {
          question = editedQuestion;
        }
        return question;
      })
    );
  };

  const deleteQuestion = (questionId: string): void => {
    setQuestions((prevState) => prevState.filter((question) => question._id !== questionId));
  };

  const resetAllQuestionVotes = (): void => {
    setQuestions((prevState) =>
      prevState.map((question) => {
        question.voteCount = 0;
        return question;
      })
    );
  };

  return (
    <QuestionsContext.Provider
      value={{ questions, addQuestion, editQuestion, deleteQuestion, setQuestions, resetAllQuestionVotes }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContextProvider;
