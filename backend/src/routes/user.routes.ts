import express from "express";
import { addFavorite } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

// POST /api/users/favorites/:animalId
router.post("/favorites/:animalId", authenticate, addFavorite);

export default router;
