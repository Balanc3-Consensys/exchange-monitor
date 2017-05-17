import mongoose from 'mongoose';
import priceSchema from './prices';

const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  name: {
    type: String,
    index: true,
    lowerCase: true
  },
  timestampMinute: { type: Date, default: Date.now },
  prices: [priceSchema]
});

export default exchangeSchema;
