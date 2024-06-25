import mongoose, { Schema } from 'mongoose';
import common from './common';

const schema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    ...common
  },
  {
    timestamps: true
  }
);

schema.index(
  {
    email: 1,
    phone: 1
  },
  {
    unique: true,
    sparse: true
  }
);

export default mongoose.model('users', schema);
