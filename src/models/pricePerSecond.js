import mongoose from 'mongoose';
import exchangesSchema from './exchanges';

const Schema = mongoose.Schema;

const PricePerSecondSchema = new Schema({
  timeStamps: { type: Date, default: Date.now },
  fromAsset: { type: String, index: true },
  toAsset: { type: String, index: true },
  exchanges: exchangesSchema
});

export default mongoose.model('PricePerSecond', PricePerSecondSchema);
