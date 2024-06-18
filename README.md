# SCO - Angular Modules Federation Example

Sco Angular Modules Federation Example es un template de la tecnología 'Angular Modules Federation', permite a la aplicación determinar las ubicaciones remotas de sus micro aplicaciones y cargarlas en tiempo real de ejecución.

El ejemplo consiste en cinco (5) proyectos, que pueden convivir por separado, aunque en este caso estan juntos para simplificar el ejemplo:
- Shell -> Frontend principal que carga las ubicaciones remotas del resto de micro frontends
- Backend -> Backend de ejemplo que controla un login y devuelve un menú de módulos remotos al iniciar sesión
- Hello-world -> Microfrontend remoto, en este caso usado como primer ejemplo y como dummy de pruebas sobre las distintas dependencias
- Modules -> Microfrontend remoto que muestra una tabla con la lista de módulos que tiene en memoria el backend
- Users -> Microfrontend remoto que muestra una tabla con la lista de usuarios que tiene en memoria el backend

# Características principales

El proyecto está preparado para, separar los distintos proyectos en solitario.
Cada microfrontend cuenta con tres (3) entornos, desarrollo (dev), preproducción (pre) y producción (prod), este está preparado para cargado y paquetizar la aplicación con las distintas configuraciones

# Iniciar repositorio en desarrollo

Para iniciar y probar el repositorio seguiremos los siguientes pasos:
- git clone https://github.com/SCO-SantiComeras/sco-angular-modules-federation.git
- cd sco-angular-modules-federation
- npm i (Dependencias de para gestionar el unirepositorio)
- npm run install-deps (Dependencias del resto de proyectos)
- npm run run-dev

# Paquetizar la aplicación

Los microfrontends cuenta con tres (3) scripts disintos, uno por cada configuración:
- npm run build
- npm run build:pre
- npm run build:prod

El backend, al ser una pieza totalmente de ejemplo, no contiene configuraciones:
- npm run build

Para gestionar todos los proyectos al mismo tiempo, desde el unirepositorio podremos utilizar:
- npm run build-dev
- npm run build-pre
- npm run build-prod

# Despliegue de la aplicación

Como primer paso, desplegaremos el backend:
- Paquetizamos el backend -> npm run build
- Copiamos el resultado 'dist' al servidor mediante FTP por ejemplo
- Mediante ssh accedemos al servidor, y accedemos a la carpeta 'dist' que hemos copiado anteriormente
- Instalamos la dependencias -> npm install
- Iniciamos la aplicación:
    - Sin pm2 -> npm run start
    - Con pm2 -> npm run pm2:start

Para desplegar los microfrontends, en este ejemplo utilizaremos un servidor Web, como por ejemplo Apache2 en Ubuntu Server
- Paquetizamos los frontends -> npm run build || npm run build:pre || npm run build:prod
- Dentro de la carpeta de servidor web, moveremos los resultados de las paquetizaciones
    - Moveremos la carpeta del módulo que se ecuentra en la carpeta 'dist' del resultado
- Una vez copiados todos los microfrontends, podremos hacer uso de la aplicación

# Ejemplo
- https://scoapps.es/ng-federation-modules/shell/
    - https://scoapps.es/ng-federation-modules/hello-world/
    - https://scoapps.es/ng-federation-modules/modules/
    - https://scoapps.es/ng-federation-modules/users/

- Usuarios de prueba
    - admin // admin
    - user // user

# Stay in touch
- Author - [Santiago Comeras Oteo](https://santiagocomerasoteo.es)