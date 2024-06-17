export const environment = {
  env: 'prod',
  production: true,
  https: false,
  apiHost: 'localhost',
  apiPort: 3000,
  apiPrefix: 'api',
  apiUrl: '',
};

/* Api Url Autogenerated */
environment.apiUrl = `${environment.https ? 'https://' : 'http://'}`;
environment.apiUrl += `${environment.apiHost}`;
environment.apiUrl += `:${environment.apiPort}/${environment.apiPrefix}`;