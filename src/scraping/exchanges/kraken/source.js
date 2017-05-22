import request from 'request-promise';
import config from 'config';
import _ from 'lodash';

export default async () => {
  try {
    const pairHeader = {
      url: `${config.apis.kraken}/public/AssetPairs`,
      json: true
    };

    const pairs = await request(pairHeader);

    return _.map(pairs.result, async (v, k) => {
      const assetHeader = {
        url: `${config.apis.kraken}/public/Ticker`,
        qs: { pair: k },
        json: true
      };

      const data = await request(assetHeader);
      const asset = data.result[k];

      return {
        base: v.base,
        quote: v.quote,
        last: asset.c[0],
        lowest: asset.l[0],
        highest: asset.h[0],
        lowest24h: asset.l[1],
        highest24h: asset.h[1],
        baseVolume: asset.v[0],
        quoteVolume: asset.p[0]
      };
    });
  } catch (e) {
    throw e;
  }
};
