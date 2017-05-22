import _ from 'lodash';
import moment from 'moment';

// Load database models
import AssetsPrices from '../../../models/assetsPrice';

// Load resources
import source from './source';

export default async () => {
  try {
    const assets = await source();

    _.forEach(assets, (v, k) => {

    });
  } catch (e) {
    throw e;
  }
};
