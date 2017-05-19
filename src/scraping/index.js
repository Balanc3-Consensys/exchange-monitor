import parallel from 'async/parallel';
import moment from 'moment';

// Load scrapping scripts
import poloScript from './exchanges/poloniex/script';

export default async function savePriceData() {
  parallel({
    poloniex: async (cb) => {
      try {
        await poloScript();
        cb(null, `Got data from poloniex, at ${moment().format('MM/DD/YYYY HH:mm:ss')}`);
      } catch (e) {
        cb(`Error at scraper: ${e}`, null);
      }
    }
  }, (err, res) => {
    if (err) { console.log(err); }
    console.log(res);
  });
}
