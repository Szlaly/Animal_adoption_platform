// src/controllers/animal.controller.ts

import { Request, Response } from "express";
import { Animal } from "../models/animal.model";
import { Adoption } from "../models/adoption.model";

export const getAllAnimals = async (req: Request, res: Response) => {
  const animals = await Animal.find();
  res.json(animals);
};

export const getAnimalById = async (req: Request, res: Response): Promise<any> => {
  const animal = await Animal.findById(req.params.id);
  if (!animal) return res.status(404).send("Állat nem található");
  res.json(animal);
};

/*export const createAnimal = async (req: Request, res: Response) => {
  const newAnimal = new Animal(req.body);
  await newAnimal.save();
  res.status(201).json(newAnimal);
};*/
export const createAnimal = async (req: Request, res: Response) => {
  try {
    const {
      name,
      age,
      species,
      breed,
      description,
      health,
      story
    } = req.body;

    const imageBuffer = req.file?.buffer;
    const imageMimeType = req.file?.mimetype;

    // Itt lehet menteni a fájlt vagy annak URL-jét beállítani (pl. fájlrendszerbe, vagy később S3-ba)
    // Példa:
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newAnimal = new Animal({
      name,
      age,
      species,
      breed,
      description,
      health,
      story,
      imageUrl,
      likedBy: []
    });

    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    console.error('Hiba állat létrehozásakor:', error);
    res.status(500).json({ message: 'Hiba történt az állat hozzáadásakor.' });
  }
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
  const { id } = req.params;

  try {
    // Töröld az állatot
    const deletedAnimal = await Animal.findByIdAndDelete(id);

    if (!deletedAnimal) {
      return res.status(404).json({ message: 'Állat nem található' });
    }

    // Töröld az állathoz tartozó örökbefogadási kérelmeket
    await Adoption.deleteMany({ animal: id }); // ← helyes használat

    res.status(200).json({ message: 'Állat és a kapcsolódó kérelmek törölve' });
  } catch (error) {
    res.status(500).json({ message: 'Hiba az állat törlése közben', error });
  }
};
