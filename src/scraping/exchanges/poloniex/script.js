import _ from 'lodash';
import moment from 'moment';

// Load database models
import AssetsPrices from '../../../models/assetsPrice';

// Load resources
import source from './source';

// This function get the source data and saves on database, based on time
// series logic
export default async () => {
  try {
    const assets = await source();

    _.forEach(assets, async (v, k) => {
      const i = k.indexOf('_');

      let asset = await AssetsPrices.findOne({
        base: k.substring(0, i),
        quote: k.substring(i + 1)
      });

      if (!asset) {
        asset = new AssetsPrices({
          base: k.substring(0, i),
          quote: k.substring(i + 1),
          timestamp: moment().toDate()
        });
      }

      let exchange = asset.exchanges.find(o => o.name === 'poloniex');

      if (!exchange) {
        asset.exchanges.push({
          name: 'poloniex'
        });
        exchange = asset.exchanges.find(o => o.name === 'poloniex');
      }

      const subdoc = asset.exchanges.id(exchange.id);

      subdoc.prices.push({
        timestamp: moment().toDate(),
        last: Number(v.last),
        lowest: Number(v.lowestAsk),
        highest: Number(v.highestBid),
        percentageChange: v.percentageChange,
        baseVolume: Number(v.baseVolume),
        quoteVolume: Number(v.quoteVolume)
      });

      asset.save();
    });

    return true;
  } catch (e) {
    return e;
  }
};
