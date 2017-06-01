import mongoose from 'mongoose';
import exchangeSchema from './exchanges';

const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  pair: { type: String, index: true },
  exchanges: [exchangeSchema]
});

export default mongoose.model('Assets', AssetSchema);
