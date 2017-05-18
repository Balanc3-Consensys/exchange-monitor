import parallel from 'async/parallel';


export default async function savePriceData() {
  parallel({
    poloniex: async (cb) => {

    },
    kraken: async (cb) => {

    }
  }, (err, res) => {
    console.log(res);
  });
}
