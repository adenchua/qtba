import { Request, Response } from "express";

import Platform from "../models/platform";
import getSlugFromTitle from "../utils/getSlutFromTitle";

export async function createPlatform(req: Request, res: Response) {
  const { title } = req.body;

  if (!title) {
    res.status(400).send();
    return;
  }

  try {
    const slug = getSlugFromTitle(title);
    const newPlatform = new Platform({ title, slug });
    const result = await newPlatform.save();
    res.status(201).send(result);
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}

export async function getPlatforms(req: Request, res: Response) {
  try {
    const platforms = await Platform.find();
    res.status(200).send(platforms);
  } catch (error) {
    console.error("error", error);
    res.status(500).send();
  }
}
