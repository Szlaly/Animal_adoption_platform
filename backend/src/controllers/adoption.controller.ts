import { Request, Response } from "express";
import { Adoption } from "../models/adoption.model";
import mongoose from "mongoose";

export const getAllAdoptions = async (_req: Request, res: Response) => {
  try {
    // A populate biztosítja, hogy a user és animal objektumok is be legyenek töltve
    const adoptions = await Adoption.find()
      .populate("user")  // Betölti a teljes user objektumot
      .populate("animal") // Betölti az állat objektumot

    // Most már közvetlenül hozzáférhetünk a user email mezőjéhez
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: "Hiba történt a kérelmek lekérésekor.", error });
  }
};




export const updateAdoptionStatus = async (req: Request, res: Response): Promise<any> => {
  const { status, meetingDate } = req.body;
  const { id } = req.params;

  const adoption = await Adoption.findById(id);
  if (!adoption) return res.status(404).json({ message: "Kérelem nem található" });

  adoption.status = status || adoption.status;
  adoption.meetingDate = meetingDate || adoption.meetingDate;

  await adoption.save();
  res.json(adoption);
};

export const submitAdoptionRequest = async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).user.id;
  const { animalId, message, email, name } = req.body; // Az email és name mezők hozzáadása

  if (!mongoose.Types.ObjectId.isValid(animalId)) {
    return res.status(400).json({ message: "Érvénytelen állat ID" });
  }

  // Ellenőrizzük, hogy az email és a név létezik-e
  if (!email || !name) {
    return res.status(400).json({ message: "Hiányzó név vagy email" });
  }

  try {
    const adoption = new Adoption({
      user: userId,
      animal: animalId,
      message,
      status: "pending",
      email,   // Az email hozzáadása
      name,    // A név hozzáadása
    });

    await adoption.save();
    res.status(201).json({ message: "Örökbefogadási kérelem elküldve", adoption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hiba történt a mentés közben" });
  }
};
