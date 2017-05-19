import parallel from 'async/parallel';
import moment from 'moment';

// Load scrapping scripts
import poloScript from './exchanges/poloniex/script';

export default async function savePriceData() {
  parallel({
    poloniex: async (cb) => {
      const result = await poloScript();

      if (result) {
        cb(null, `Got data from poloniex, at ${moment().format('MM/DD/YYYY HH:mm:ss')}`);
      } else {
        cb(`Error at scraper: ${result}`);
      }
    }
  }, (err, res) => {
    if (err) { console.log(err); }
    console.log(res);
  });
}
