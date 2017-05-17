import mongoose from 'mongoose';
import exchangeSchema from './exchanges';

const Schema = mongoose.Schema;

const AssetsPriceSchema = new Schema({
  timeStamps: { type: Date, default: Date.now },
  fromAsset: { type: String, index: true },
  toAsset: { type: String, index: true },
  exchanges: [exchangeSchema]
});

export default mongoose.model('AssetsPrice', AssetsPriceSchema);
