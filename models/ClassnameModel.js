import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('Classname', schema);
