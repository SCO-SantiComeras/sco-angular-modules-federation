/* Imports */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Declarations */
const app = express();
const port = 3000;
const MODULES_ROUTES = require('./modules/modules.routes');
const USERS_ROUTES = require('./users/users.routes');

/* Body Parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Cors */
app.use(cors())

/* Routes */
app.use('/api', [
  MODULES_ROUTES,
  USERS_ROUTES,
]);

/* Server */
app.listen(port, () => {
  console.log(`Backend starts in route http://localhost:${port}`);
});
