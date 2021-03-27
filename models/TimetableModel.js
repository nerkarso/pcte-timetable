import { model, Schema } from 'mongoose';

const schema = new Schema({
  date: {
    type: String,
    required: true,
  },
  data: {
    type: String,
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('Timetable', schema);
