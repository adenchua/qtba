import { Request, Response } from "express";

import Question, { QuestionDocumentInterface } from "../models/question";
import Module from "../models/module";
import { removeUndefinedKeysFromObject } from "../utils/removeUndefinedKeysFromObject";

export async function createQuestion(req: Request, res: Response) {
  const { moduleId, title, comment } = req.body;

  if (!title || !moduleId) {
    res.status(400).send();
    return;
  }

  try {
    const newQuestion = new Question({ title, comment });
    const module = await Module.findById(moduleId);
    if (!module) {
      throw Error("invalid module ID");
    }
    const result = await newQuestion.save();
    module.questions.push(result._id);
    await module.save();
    res.status(201).send(result);
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}

export async function getQuestionsByIds(req: Request, res: Response) {
  const { questionIds } = req.body;
  const results: QuestionDocumentInterface[] = [];

  if (!questionIds || !Array.isArray(questionIds)) {
    res.status(400).send();
    return;
  }

  try {
    for (const questionId of questionIds) {
      const question = await Question.findById(questionId);
      if (question) {
        results.push(question);
      }
    }

    res.status(200).send(results);
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}

export async function updateQuestion(req: Request, res: Response) {
  const { questionId, title, isStrikethrough, comment, voteCount } = req.body;

  if (!questionId) {
    res.status(400).send();
    return;
  }

  const fieldsToUpdate = removeUndefinedKeysFromObject({ title, isStrikethrough, comment, voteCount });

  try {
    const questionToUpdate = await Question.findByIdAndUpdate(fieldsToUpdate);
    res.status(200).send(questionToUpdate);
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}

export async function increaseVote(req: Request, res: Response) {
  const { questionId } = req.body;

  if (!questionId) {
    res.status(400).send();
    return;
  }

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      throw Error("Unable to retrieve question");
    }

    question.voteCount += 1;
    const result = await question.save();
    res.status(200).send(result);
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}
