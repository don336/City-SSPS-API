import mongoose from "mongoose";

const powerSchema = mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  neighborhood: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateReport: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  level: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
    required: true
  }
});

export default mongoose.model('Power', powerSchema, 'powers');