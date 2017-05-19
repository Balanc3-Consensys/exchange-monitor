import Express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import bodyParser from 'body-parser';
import moment from 'moment';
import * as db from './src/lib/db';

import script from './src/scraping/exchanges/poloniex/script';

const app = Express();
const port = process.env.PORT || config.http.port;
const conn = mongoose.connection;

// Setting default port
app.set('port', port);

// Setting server configurations
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

db.connectdb();

conn.on('open', () => {
  app.listen(app.get('port'), async (err) => {
    if (err) { return console.log(`Server error: ${err}`); }
    console.log(await script());
    console.log(`Server up, port: ${port}`);
    return 0;
  });
})
.on('error', err => console.log(`Error on connecting to database: ${err}`));
