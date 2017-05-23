import moment from 'moment';

// Load database models
import AssetsPrices from '../../../models/assetsPrice';

// Load resources
import source from './source';

export default async () => {
  try {
    const assets = await source();

    assets.forEach(async (o) => {
      let asset = await AssetsPrices.findOne({
        altname: o.altname
      });

      if (!asset) {
        asset = new AssetsPrices({
          altname: o.altname,
          quote: o.quote,
          timestamp: moment().toDate()
        });
      }

      let exchange = asset.exchanges.find(e => e.name === 'kraken');

      if (!exchange) {
        asset.exchanges.push({
          name: 'kraken'
        });
        exchange = asset.exchanges.find(e => e.name === 'kraken');
      }

      const subdoc = asset.exchanges.id(exchange.id);

      subdoc.prices.push({
        ...o, timestamps: moment().toDate()
      });

      asset.save();
    });
  } catch (e) {
    throw e;
  }
};
