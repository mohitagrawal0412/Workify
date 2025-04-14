import mongoose from 'mongoose';

const reflectionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Reflection = mongoose.model('Reflection', reflectionSchema);
export default Reflection;
