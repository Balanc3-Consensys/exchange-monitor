import moment from 'moment';

import Asset from '../../models/assets';

export async function save(data, exchange) {
  try {
    const { pair } = data;

    let asset = await Asset.findOne({ pair });

    if (!asset) {
      asset = new Asset({ pair });
    }

    let doc = asset.exchanges.find(o => o.name === exchange);

    if (!doc) {
      asset.exchanges.push({ name: exchange });
      doc = asset.exchanges.find(o => o.name === exchange);
    }

    const subdoc = asset.exchanges.id(doc.id);

    subdoc.prices.push({
      ...data, timestamps: moment().toDate()
    });

    asset.save();
  } catch (e) {
    throw new Error(e);
  }
}
