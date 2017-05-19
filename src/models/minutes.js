import mongoose from 'mongoose';
import priceSchema from './prices';

const Schema = mongoose.Schema;

const minuteSchema = new Schema({
  timestampMinute: { type: Date, default: Date.now },
  prices: [priceSchema]
});

export default minuteSchema;
