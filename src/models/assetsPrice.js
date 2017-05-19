import mongoose from 'mongoose';
import minuteSchema from './minutes';

const Schema = mongoose.Schema;

const AssetsPriceSchema = new Schema({
  timestampHour: { type: Date, default: Date.now },
  fromAsset: { type: String, index: true },
  toAsset: { type: String, index: true },
  exchangeName: { type: String, index: true },
  minutes: [minuteSchema]
});

export default mongoose.model('AssetsPrice', AssetsPriceSchema);
