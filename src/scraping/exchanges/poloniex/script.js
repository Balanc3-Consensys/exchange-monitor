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
        fromAsset: k.substring(0, i),
        toAsset: k.substring(i + 1)
      });

      if (!asset) {
        asset = new AssetsPrices({
          fromAsset: k.substring(0, i),
          toAsset: k.substring(i + 1),
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
      const price = subdoc.prices.find(o =>
        moment(o.timestampMinute).isSame(moment().toDate())
      );

      if (!price) {
        subdoc.prices.push({
          timestamp: moment().toDate(),
          last: Number(v.last),
          lowest: Number(v.lowestAsk),
          highest: Number(v.highestBid),
          percentageChange: v.percentageChange,
          volume: Number(v.baseVolume)
        });
      }

      asset.save();
    });

    return true;
  } catch (e) {
    return e;
  }
};
