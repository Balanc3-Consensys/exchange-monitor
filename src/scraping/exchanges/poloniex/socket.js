import autobahn from 'autobahn';
import config from 'config';

// Import exchanges lib
import * as lib from '../';

const wss = new autobahn.Connection({
  url: config.exchanges.poloniex.ws,
  realm: 'realm1'
});

wss.onopen = (session) => {
  const tickerEvent = async (args, kwargs) => {
    try {
      const obj = {
        pair: args[0].replace('_', ''),
        last: Number(args[1]),
        lowestAsk: Number(args[2]),
        highestBid: Number(args[3]),
        percentageChange: Number(args[4]),
        volume: Number(args[5]),
        highest24h: Number(args[8]),
        lowest24h: Number(args[9])
      };

      await lib.save(obj, 'poloniex');
      console.log('log poloniex');
    } catch (e) {
      console.error(`Error at poloniex socket: ${e}`);
    }
  };
  session.subscribe('ticker', tickerEvent);
};

wss.open();
