import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const priceSchema = new Schema({
  last: { type: Number, min: 0, index: true },
  lowest: { type: Number, min: 0, index: true },
  highest: { type: Number, min: 0, index: true },
  percentageChange: { type: Number, min: 0, index: true },
  volume: { type: Number, min: 0, index: true },
  timestamps: { type: Date, default: Date.now }
});

export default priceSchema;
