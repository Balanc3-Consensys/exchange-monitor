import mongoose from 'mongoose';
import exchangeSchema from './exchanges';

const Schema = mongoose.Schema;

const AssetsPriceSchema = new Schema({
  altname: { type: String, index: true },
  base: { type: String, index: true },
  quote: { type: String, index: true },
  exchanges: [exchangeSchema],
  timestamps: { type: Date, default: Date.now }
});

export default mongoose.model('AssetsPrice', AssetsPriceSchema);
