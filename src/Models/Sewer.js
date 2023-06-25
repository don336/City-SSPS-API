const mongoose = require('mongoose');

const sewerSchema = new mongoose.Schema({
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
    required: true
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

const Sewer = mongoose.model('Sewer', sewerSchema, 'sewers');

export default Sewer;