import { model, Schema } from 'mongoose';

const schema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('Timetable', schema);
