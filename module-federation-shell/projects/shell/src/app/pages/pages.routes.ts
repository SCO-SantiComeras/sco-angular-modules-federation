import { Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
  // Load React Component Example
  /* {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry:
        'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element',
    },
  }, */

  // Load Angular Module Federation Module Example
  /* {
    path: 'helloworld',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'hello-world',
        exposedModule: './Module',
      }).then((m) => m.TestModule),
  } */
];
