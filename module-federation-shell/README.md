# Example for @angular-architects/module-federation

This examples loads a microfrontend into a shell:

![Microfrontend Loaded into Shell](./result.png)

## Important Files

Have a particular look at the following files:

- ``readme.md``: Shows how to install dependencies and how to start the example
- ``projects\hello-world\webpack.config.js``: Microfrontend config *(This file is in module-federation-hello-world repository, this is only information)
- ``projects\shell\webpack.config.js``: Shell config
- ``projects\shell\src\app\app.routes.ts``: Lazy route for microfrontend
- ``projects\shell\src\decl.d.ts``: Typing for mapped Url pointing to microfrontend

## Installation and Usage

- Install packages: ``npm`` || ``yarn`` (!)*
- Start Shell (host): ``ng serve shell -o``
- Make sure all angular federation modules are started before ``shell`` is loaded into the browser

## Consume a new Angular Federation Module

- In the host app (Shell) you need to declare the new module to consume it
    - decl.d.ts
        - declare module 'hello-world/Module';
    - mf.manifest.json
        - "hello-world": "http://localhost:5999/remoteEntry.js"