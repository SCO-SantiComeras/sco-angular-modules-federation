module.exports = Object.freeze([
    {
        menuName: 'Hola mundo',
        menuRoute: '/helloworld/test-component',
        path: 'helloworld',
        type: 'manifest',
        remoteName: 'hello-world',
        exposedModule: './Module',
        moduleName: 'TestModule',
    },
    {
        menuName: 'Módulos',
        menuRoute: '/modules/modules-list',
        path: 'modules',
        type: 'manifest',
        remoteName: 'modules',
        exposedModule: './Module',
        moduleName: 'ModulesModule',
    },
    {
        menuName: 'Usuarios',
        menuRoute: '/users/users-list',
        path: 'users',
        type: 'manifest',
        remoteName: 'users',
        exposedModule: './Module',
        moduleName: 'UsersModule',
    },
]);