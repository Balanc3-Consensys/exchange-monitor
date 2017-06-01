import BitfinexWS from 'bitfinex-api-node';

const wss = new BitfinexWS().ws;

wss.on('open', () => {
  const assets = [
    'BTCUSD',
    'LTCUSD',
    'LTCBTC',
    'ETHUSD',
    'ETHBTC',
    'ETCUSD',
    'ETCBTC',
    'BFXUSD',
    'BFXBTC',
    'RRTUSD',
    'RRTBTC',
    'ZECUSD',
    'ZECBTC'
  ];

  assets.forEach(a =>
    wss.subscribeTicker(a)
  );
});

wss.on('ticker', (pair, ticker) => {
  console.log(pair, ticker);
});

wss.on('subscribed', (data) => {
  console.log('New subscription', data);
});

wss.on('error', console.error);
