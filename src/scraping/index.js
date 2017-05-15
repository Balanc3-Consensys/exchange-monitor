import PricePerSecond from '../models/pricePerSecond';

// Load Sources
import poloniex from './sources/poloniex';

export default async function savePriceData() {
  const test = await poloniex();
  console.log(test);
}
