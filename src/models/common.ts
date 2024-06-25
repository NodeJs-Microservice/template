import { Schema } from 'mongoose';

export default {
  parent: Schema.Types.ObjectId,
  parents: [Schema.Types.ObjectId],
  metadata: {
    type: Object,
    default: {}
  }
};
