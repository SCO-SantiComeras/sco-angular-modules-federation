export const environment = {
  env: 'prod',
  production: true,
  https: false,
  apiHost: 'localhost',
  apiPort: 3150,
  apiPrefix: 'api',
  apiUrl: '',
  apiWebsocketPort: 3151,
  apiWebsocketUrl: '',
};

/* Api Url Autogenerated */
environment.apiUrl = `${environment.https ? 'https://' : 'http://'}`;
environment.apiUrl += `${environment.apiHost}`;
environment.apiUrl += `:${environment.apiPort}/${environment.apiPrefix}`;

/* Api Websocket Url Autogenerated */
environment.apiWebsocketUrl = `${environment.https ? 'wss://' : 'ws://'}`;
environment.apiWebsocketUrl += `${environment.apiHost}:${environment.apiWebsocketPort}`;