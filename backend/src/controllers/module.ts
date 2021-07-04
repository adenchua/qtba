import { Request, Response } from "express";

import Module, { ModuleDocumentInterface } from "../models/module";
import Platform from "../models/platform";
import getSlugFromTitle from "../utils/getSlutFromTitle";

export async function createModule(req: Request, res: Response) {
  const { platformId, title } = req.body;

  if (!title || !platformId) {
    res.status(400).send();
    return;
  }

  try {
    const slug = getSlugFromTitle(title);
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
