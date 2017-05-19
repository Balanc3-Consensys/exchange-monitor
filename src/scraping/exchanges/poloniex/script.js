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
        timestampHour: moment().format('YYYY-MM-DDThh:00:00')
      });

      const i = k.indexOf('_');

      if (!price) {
        price = new AssetsPrices({
          timestampHour: moment().format('YYYY-MM-DDThh:00:00'),
          fromAsset: k.substring(0, i),
          toAsset: k.substring(i + 1),
          exchangeName: 'poloniex'
        });
      }
      let minute = price.minutes.find(o =>
        o.timestampMinute === moment().format('YYYY-MM-DDThh:mm:00')
      );

      // check if minute doesn't exists
      if (!minute) {
        price.minutes.push({
          timestampMinute: moment().format('YYYY-MM-DDThh:mm:00')
        });
        minute = price.minutes.find(o =>
          o.timestampMinute === moment().format('YYYY-MM-DDThh:mm:00')
        );
        console.log(minute);
      }

      // const second = price.minutes.prices.find(o =>
      //   o.timestampSecond === moment().format('YYYY-MM-DDThh:mm:ss')
      // );

      // console.log(price.minutes);
      // return price.save();
    });
  } catch (e) {
    return e;
  }
};
