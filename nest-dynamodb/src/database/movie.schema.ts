import { Schema } from 'dynamoose';

export const MovieSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
  },
  authors: {
    type: Array,
  },
});