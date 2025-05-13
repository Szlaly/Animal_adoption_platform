// src/controllers/animal.controller.ts

import { Request, Response } from "express";
import { Animal } from "../models/animal.model";

export const getAllAnimals = async (req: Request, res: Response) => {
  const animals = await Animal.find();
  res.json(animals);
};

export const getAnimalById = async (req: Request, res: Response): Promise<any> => {
  const animal = await Animal.findById(req.params.id);
  if (!animal) return res.status(404).send("Állat nem található");
  res.json(animal);
};

export const createAnimal = async (req: Request, res: Response) => {
  const newAnimal = new Animal(req.body);
  await newAnimal.save();
  res.status(201).json(newAnimal);
};

export const updateAnimal = async (req: Request, res: Response): Promise<any> => {
  try {
    const updated = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send("Állat nem található");
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Hiba történt az állat adatainak frissítésekor");
  }
};

export const deleteAnimal = async (req: Request, res: Response): Promise<any> => {
  const deleted = await Animal.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send("Nem található");
  res.sendStatus(204);
};
