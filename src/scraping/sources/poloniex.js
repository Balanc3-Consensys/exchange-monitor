import request from 'request-promise';
import config from 'config';

module.exports = async () => {
  try {
    const options = {
      url: `${config.apis.poloniex}/public`,
      qs: {
        command: 'returnTicker'
      },
      json: true
    };

    return await request(options);
  } catch (e) {
    return e;
  }
};
