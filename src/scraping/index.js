import parallel from 'async/parallel';

// Connect to websockets
import socketPoloniex from './exchanges/poloniex/socket';
import socketBitfinex from './exchanges/bitfinex/socket';

// Load eventloops (historical data)

export default async function scraper() {
  parallel({
    poloniex: async () => {
      try {

      } catch (e) {
        console.error(`Error at scraper: ${e}`);
      }
    },
    bitfinex: async () => {
      try {

      } catch (e) {
        console.error(`Error at scraper: ${e}`);
      }
    }
  });
}
