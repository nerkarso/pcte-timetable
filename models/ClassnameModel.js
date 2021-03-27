import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
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

export default model('Classname', schema);
