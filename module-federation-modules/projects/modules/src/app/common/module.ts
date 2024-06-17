export class Module {
    menuName: string;
    menuRoute: string;
    path: string;
    type: any; // TODO: Fix any type (If you provide a string type value it works OK but angular compiler dont work it)
    remoteName: string;
    exposedModule: string;
    moduleName: string;
}