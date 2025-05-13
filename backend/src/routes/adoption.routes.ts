import express from "express";
import { authenticate, requireAdmin } from "../middleware/auth.middleware";
import {  getAllAdoptions, submitAdoptionRequest, updateAdoptionStatus } from "../controllers/adoption.controller";


const router = express.Router();
router.post("/", authenticate, submitAdoptionRequest);
router.get("/", authenticate, requireAdmin, getAllAdoptions);
router.put("/:id", authenticate, requireAdmin, updateAdoptionStatus);

export default router;
