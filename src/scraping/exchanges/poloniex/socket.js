import autobahn from 'autobahn';
import config from 'config';

// Import exchanges lib
import * as lib from '../';

const wss = new autobahn.Connection({
  url: config.exchanges.poloniex.ws,
  realm: 'realm1'
});

wss.onopen = (session) => {
  const tickerEvent = (args, kwargs) => {
    const obj = {
      pair: args[0].replace('_', ''),
      last: Number(args[1]),
      lowestAsk: Number(args[2]),
      highestBid: Number(args[3]),
      percentageChange: Number(args[4]),
      baseVolume: Number(args[5]),
      quoteVolume: Number(args[6]),
      highest24h: Number(args[8]),
      lowest24h: Number(args[9])
    };

    lib.save(obj, 'poloniex');
  };
  session.subscribe('ticker', tickerEvent);
};

wss.open();
