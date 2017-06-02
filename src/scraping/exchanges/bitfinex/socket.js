import BitfinexWS from 'bitfinex-api-node';

// exchange lib
import * as lib from '../';

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

wss.on('ticker', async (pair, ticker) => {
  try {
    const obj = {
      pair,
      last: ticker.lastPrice,
      lowestAsk: ticker.ask,
      highestBid: ticker.bid,
      percentageChange: ticker.dailyChangePerc,
      highest24h: ticker.high,
      lowest24h: ticker.low,
      volume: ticker.volume
    };

    await lib.save(obj, 'bitfinex');
    console.log('log bitfinex');
  } catch (e) {
    console.error(e);
  }
});

wss.on('error', console.error);
