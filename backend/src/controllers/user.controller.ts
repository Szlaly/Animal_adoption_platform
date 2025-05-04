import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/user.model";
import { Animal } from "../models/animal.model";

export const addFavorite = async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).user.id;
  const animalId = req.params.animalId;

  // Ellenőrzés, hogy az ID érvényes-e
  if (!mongoose.Types.ObjectId.isValid(animalId)) {
    return res.status(400).json({ message: "Érvénytelen állat ID" });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "Felhasználó nem található" });

  const animalObjectId = new mongoose.Types.ObjectId(animalId);

  if (user.favorites.some(fav => fav.equals(animalObjectId))) {
    return res.status(400).json({ message: "Ez az állat már a kedvencek között van" });
  }

  user.favorites.push(animalObjectId);
  await user.save();

  res.json({ message: "Hozzáadva a kedvencekhez", favorites: user.favorites });
};

