

import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  species: String,
  breed: String,
  description: String,
  health: String,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  imageUrl: String
}, {
  timestamps: true
});

export const Animal = mongoose.model("Animal", animalSchema);
