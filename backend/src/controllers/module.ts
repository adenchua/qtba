import { Request, Response } from "express";

import Module, { ModuleDocumentInterface } from "../models/module";
import Question from "../models/question";
import Platform from "../models/platform";
import cleanSlug from "../utils/cleanSlug";
import generateRandomString from "../utils/generateRandomString";
import removeUndefinedKeysFromObject from "../utils/removeUndefinedKeysFromObject";

async function doesModuleSlugExists(slug: string): Promise<boolean> {
  const module = await Module.findOne({ slug });
  if (module) {
    return true;
  }
  return false;
}

export async function createModule(req: Request, res: Response) {
  const { platformId, title } = req.body;

  if (!title || !platformId) {
    res.status(400).send();
    return;
  }

  try {
    let slug = cleanSlug(title);
    while (await doesModuleSlugExists(slug)) {
      slug = `${cleanSlug(title)}-${generateRandomString(5)}`;
    }
    const newModule = new Module({ title, slug });
    const platform = await Platform.findById(platformId);
    if (!platform) {
      throw Error("invalid platform ID");
    }
    const result = await newModule.save();
    platform.modules.push(result._id);
    await platform.save();
    res.status(201).send(result);
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}

export async function getModulesByIds(req: Request, res: Response) {
  const { moduleIds } = req.body;
  const results: ModuleDocumentInterface[] = [];

  if (!moduleIds || !Array.isArray(moduleIds)) {
    res.status(400).send();
    return;
  }

  try {
    for (const moduleId of moduleIds) {
      const module = await Module.findById(moduleId);
      if (module) {
        results.push(module);
      }
    }

    res.status(200).send(results);
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}

export async function getModuleBySlug(req: Request, res: Response) {
  const { slug } = req.params;

  try {
    const module = await Module.findOne({ slug });
    if (!module) {
      res.status(400).send();
      return;
    }
    res.status(200).send(module);
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}

export async function resetModuleQuestionVotes(req: Request, res: Response) {
  const { moduleId } = req.body;

  try {
    const module = await Module.findById(moduleId);
    if (!module) {
      res.status(400).send();
      return;
    }

    const questionIds = module.questions;
    for (const questionId of questionIds) {
      await Question.findByIdAndUpdate(questionId, { voteCount: 0 });
    }
    res.status(204).send();
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}

export async function deleteModule(req: Request, res: Response) {
  const { moduleId } = req.body;

  try {
    const module = await Module.findById(moduleId);
    if (!module) {
      res.status(400).send();
      return;
    }
    const questionIds = module.questions;
    // delete all questions first, then delete module
    for (const questionId of questionIds) {
      await Question.findByIdAndDelete(questionId);
    }

    await Module.findByIdAndDelete(moduleId);
    res.status(204).send();
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}

export async function editModule(req: Request, res: Response) {
  const { moduleId, title, isVotingDisabled } = req.body; // only allow title and isVotingDisabled fields to update

  const updatedFields = removeUndefinedKeysFromObject({ title, isVotingDisabled });

  if (!moduleId) {
    res.status(400).send();
    return;
  }

  try {
    await Module.findByIdAndUpdate(moduleId, updatedFields);
    res.status(204).send();
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}
