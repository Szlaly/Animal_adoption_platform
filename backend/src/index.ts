// src/index.ts

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import animalRoutes from "./routes/animal.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("API működik");
});

mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    console.log("MongoDB kapcsolódva");
    app.listen(PORT, () => {
      console.log(`Szerver fut: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("DB hiba: ", err));
