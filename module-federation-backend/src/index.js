/* Imports */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const https = require('https');

/* Declarations */
const app = express();
const port = 3150;
const MODULES_ROUTES = require('./modules/modules.routes');
const USERS_ROUTES = require('./users/users.routes');
const domain = 'scoapps.es';

/* SSL */
let cert = undefined;
if (fs.existsSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`)) {
  cert = fs.readFileSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`);
}

let key = undefined;
if (fs.existsSync(`/etc/letsencrypt/live/${domain}/privkey.pem`)) {
  key = fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`);
}

const httpOptions = {
  key: key ? key : undefined,
  cert: cert ? cert : undefined,
};

/* Body Parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Cors */
app.use(cors({
  origin: '*'
}))

/* Routes */
app.use('/api', [
  MODULES_ROUTES,
  USERS_ROUTES,
]);


if (httpOptions.key == undefined || httpOptions.cert == undefined) {
  /* Server */
  app.listen(port, () => {
    console.log(`Backend starts in route http://localhost:${port}`);
  });
  return;
}

const server = https.createServer(httpOptions, app);
server.listen(port, () => {
  console.log(`Backend starts in route https://localhost:${port}`);
});
