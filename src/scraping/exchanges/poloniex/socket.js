import autobahn from 'autobahn';
import config from 'config';

const wss = new autobahn.Connection({
  url: config.ws.poloniex,
  realm: 'realm1'
});

wss.onopen = (session) => {
  const tickerEvent = (args, kwargs) => {
    console.log(args);
  };

  session.subscribe('ticker', tickerEvent);
};

wss.open();
