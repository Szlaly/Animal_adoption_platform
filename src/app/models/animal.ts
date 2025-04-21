import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  nature: String,
  healthInfo: String,
  imageUrls: [String],
  status: { type: String, enum: ['available', 'adopted', 'pending'], default: 'available' },
  likedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model('Animal', animalSchema);
