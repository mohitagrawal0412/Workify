import mongoose from 'mongoose';

const personalFeedSchema = new mongoose.Schema({
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
