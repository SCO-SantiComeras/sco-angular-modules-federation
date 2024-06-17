# Example for @angular-architects/module-federation

This examples loads a microfrontend into a shell:

![Microfrontend Loaded into Shell](./result.png)

## Important Files

Have a particular look at the following files:

- ``readme.md``: Shows how to install dependencies and how to start the example
- ``projects\users\webpack.config.js``: Microfrontend config

## Installation and Usage

- Install packages: ``npm`` || ``yarn`` (!)*
- Start Micro Frontend (remote): ``ng serve users -o``
- Make sure ``users`` is started before ``shell`` is loaded into the browser
