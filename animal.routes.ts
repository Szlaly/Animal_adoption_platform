import express from 'express';
import { Animal } from '../models/animal.model';

const router = express.Router();

// Összes állat lekérése
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: 'Hiba történt az állatok lekérdezése közben' });
  }
});

// Új állat hozzáadása
router.post('/', async (req, res) => {
  try {
    const newAnimal = new Animal(req.body);
    const saved = await newAnimal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Nem sikerült létrehozni az állatot' });
  }
});

export default router;
