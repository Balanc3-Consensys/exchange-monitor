import Express from 'express';
import config from 'config';
import bodyParser from 'body-parser';

const app = Express();
const port = process.env.PORT || config.http.port;

// Setting default port
app.set('port', port);

// Setting server configurations
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.listen(app.get('port'), err => {
  if (err)
    return console.log(`Server error: ${err}`);

  console.log(`Server up, port: ${port}`);
});
