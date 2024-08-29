/* Imports */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const https = require('https');
const path = require('path');

/* Declarations */
const app = express();
const port = 3150;
const MODULES_ROUTES = require('./modules/modules.routes');
const USERS_ROUTES = require('./users/users.routes');

const ssl_path = '/root/sco-domain-manager/greenlock.d/live';
const domain = 'ng.module.federation.sco-techlab.es';

/* SSL */
let cert = undefined;
if (fs.existsSync(`${ssl_path}/${domain}/fullchain.pem`)) {
  console.log(`Cert found in: ${ssl_path}/${domain}/fullchain.pem`);
  cert = fs.readFileSync(`${ssl_path}/${domain}/fullchain.pem`);
}

let key = undefined;
if (fs.existsSync(`${ssl_path}/${domain}/privkey.pem`)) {
  console.log(`Key found in: ${ssl_path}/${domain}/privkey.pem`);
  key = fs.readFileSync(`${ssl_path}/${domain}/privkey.pem`);
}

const httpOptions = {
  key: key ? key : undefined,
  cert: cert ? cert : undefined,
};

/* Body Parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public' ));

/* Cors */
app.use(cors({
  origin: '*'
}))

/* Routes */
app.use('/api', [
  MODULES_ROUTES,
  USERS_ROUTES,
]);
app.get( '/public', function( req, res ) {
  res.sendFile(path.join( __dirname, 'public', 'index.html' ));
});


if (httpOptions.key == undefined || httpOptions.cert == undefined) {
  app.listen(port, () => {
    console.log(`Backend starts in route http://localhost:${port}`);
  });
}
else {
  const server = https.createServer(httpOptions, app);
  server.listen(port, () => {
    console.log(`Backend starts in route https://${domain}:${port}`);
  });
}

