import parallel from 'async/parallel';

// Load resources
import poloniex from './sources/poloniex';

export default async function savePriceData() {
  parallel({
    poloniex: async (cb) => {
      const assets = await poloniex();

      assets.forEach(async (asset) => {
        const exchange = {

        };
      });
    },
    kraken: async (cb) => {

    }
  }, (err, res) => {
    console.log('success!');
  });
}
