// src/routes/animal.routes.ts

import express from "express";
import {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal
} from "../controllers/animal.controller";
import { authenticate, requireAdmin } from "../middleware/auth.middleware";
import { Animal } from "../models/animal.model";
const router = express.Router();


router.get("/", getAllAnimals);
router.get("/:id", getAnimalById);
router.post("/", authenticate, requireAdmin,createAnimal);
router.put("/:id", authenticate, requireAdmin,updateAnimal);
router.delete("/:id", authenticate, requireAdmin,deleteAnimal);

export default router;
