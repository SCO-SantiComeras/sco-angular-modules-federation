export class ListModules {
  static readonly type = '[Modules] List modules';
}

export class GetModule {
  static readonly type = '[Modules] Get module by module name';
  constructor(public payload: { moduleName: string } ) {}
}