import mongoose from 'mongoose';
import exchangeSchema from './exchanges';

const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  altname: { type: String, index: true },
  base: { type: String, index: true },
  quote: { type: String, index: true },
  exchanges: [exchangeSchema]
});

export default mongoose.model('Assets', AssetSchema);
