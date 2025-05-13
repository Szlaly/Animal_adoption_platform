import mongoose from "mongoose";

// Frissített séma, beleértve az új mezőket
const adoptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  animal: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  meetingDate: { type: Date }, // Admin által beállítható időpont
  email: { type: String, required: true },  // Email mező hozzáadása
  name: { type: String, required: true },   // Név mező hozzáadása
});

export const Adoption = mongoose.model("Adoption", adoptionSchema);
