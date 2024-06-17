import { loadManifest } from '@angular-architects/module-federation';
import { environment } from './environments/environment';

let manifestPath: string = `assets/mf.manifest.json`;

if (environment.env.toUpperCase ()== 'PRE') {
  manifestPath = `assets/mf.manifest.pre.json`;
}

if (environment.env.toUpperCase ()== 'PROD') {
  manifestPath = `assets/mf.manifest.prod.json`;
}

loadManifest(manifestPath)
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
