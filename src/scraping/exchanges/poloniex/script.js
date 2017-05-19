import moment from 'moment';
import _ from 'lodash';

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
      let price = await AssetsPrices.findOne({
        timestampHour: moment().startOf('hour').toDate()
      });

      const i = k.indexOf('_');

      if (!price) {
        price = new AssetsPrices({
          timestampHour: moment().startOf('hour').toDate(),
          fromAsset: k.substring(0, i),
          toAsset: k.substring(i + 1),
          exchangeName: 'poloniex'
        });
      }
      let minute = price.minutes.find(o =>
        moment(o.timestampMinute).isSame(moment().startOf('minute').toDate())
      );

      // check if minute doesn't exists
      if (!minute) {
        price.minutes.push({
          timestampMinute: moment().startOf('minute').toDate()
        });
        minute = price.minutes.find(o =>
          moment(o.timestampMinute).isSame(moment().startOf('minute').toDate())
        );
      }

      const subdoc = price.minutes.id(minute.id);

      subdoc.prices.push({
        timestamp: moment().toDate(),
        last: v.last,
        lowest: v.lowestAsk,
        highest: v.highestBid,
        percentageChange: v.percentageChange,
        volume: v.baseVolume,
        lowestDay: v.low24h,
        highestDay: v.high24h
      });

      price.save();
    });

    return true;
  } catch (e) {
    return e;
  }
};
