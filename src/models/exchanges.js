import mongoose from 'mongoose';
import priceSchema from './prices';

const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  name: { type: String, index: true },
  prices: [priceSchema]
});

export default exchangeSchema;
