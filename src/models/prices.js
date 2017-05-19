import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const priceSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  last: { type: Number, min: 0, index: true },
  lowest: { type: Number, min: 0, index: true },
  highest: { type: Number, min: 0, index: true },
  percentageChange: { type: Number, min: 0, index: true },
  volume: { type: Number, min: 0, index: true },
  lowestDay: { type: Number, min: 0, index: true },
  highestDay: { type: Number, min: 0, index: true }
});

export default priceSchema;
