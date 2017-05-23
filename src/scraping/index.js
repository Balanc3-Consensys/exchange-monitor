import parallel from 'async/parallel';
import moment from 'moment';
import _ from 'lodash';

// Load scrapping scripts
import poloScript from './exchanges/poloniex/script';
import krakenScript from './exchanges/kraken/script';

export default async function savePriceData() {
  parallel({
    poloniex: async (cb) => {
      try {
        await poloScript();
        cb(null, true);
      } catch (e) {
        cb(`Error at scraper: ${e}`, null);
      }
    },
    kraken: async (cb) => {
      try {
        await krakenScript();
        cb(null, true);
      } catch (e) {
        cb(`Error at scraper: ${e}`, null);
      }
    }
  }, (err, res) => {
    if (err) { console.log(err); }
    _.forEach(res, (v, k) => {
      console.log(`Got ticker from ${k} at ${moment().format('MM/DD/YYYY HH:mm:ss')}`);
    });
  });
}
