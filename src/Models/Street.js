import mongoose from "mongoose";

const streetSchema = mongoose.Schema({
  streetName: {
    type: String,
    required: true,
  },

  City: {
    type: String,
    required: true,
  },

  State: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

export default mongoose.model("Street", streetSchema);
