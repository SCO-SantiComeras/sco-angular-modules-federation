import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Module } from "../../common/module";
import { Injectable } from "@angular/core";
import { ModulesService } from "../modules.service";
import { GetModule, ListModules } from "./modules.actions";
import { catchError, map, tap } from 'rxjs/operators';

export class ModulesStateModel {
    modules: Module[];
    module: Module;
    success: boolean;
    successMsg: string;
    errorMsg: string;
}

export const ModulesStateDefaults: ModulesStateModel = {
    modules: undefined,
    module: undefined,
    success: false,
    successMsg: undefined,
    errorMsg: undefined,
};

@State<ModulesStateModel>({
    name: 'modules',
    defaults: ModulesStateDefaults,
}) 

@Injectable()
export class ModulesState {
    constructor(
        private readonly modulesService: ModulesService,
    ) {}

    @Selector()
    static modules(state: ModulesStateModel): Module[] {
        return state.modules;
    }

    @Selector()
    static module(state: ModulesStateModel): Module {
        return state.module;
    }

    @Selector()
    static success(state: ModulesStateModel): boolean {
        return state.success;
    }

    @Selector()
    static successMsg(state: ModulesStateModel): string {
        return state.successMsg;
    }

    @Selector()
    static errorMsg(state: ModulesStateModel): string {
        return state.errorMsg;
    }

    @Action(ListModules)
    public listModules(
        { patchState }: StateContext<ModulesStateModel>
    ) {
        return this.modulesService.listModules().pipe(
            map((modules: Module[]) => {
                if (modules && modules.length > 0) {
                    patchState({
                        modules: modules
                    });
                } else {
                    patchState({
                        modules: []
                    });
                }
            })
        );
    }

    @Action(GetModule)
    public getModule(
        { patchState }: StateContext<ModulesStateModel>,
        { payload }: GetModule
    ) {
        return this.modulesService.getModule(payload.moduleName).pipe(
            tap((module: Module) => {
                if (module) {
                    patchState({
                        module: module,
                        success: true,
                        successMsg: 'Módulo recuperado con éxito',
                    });
                } else {
                    patchState({
                        success: false,
                        errorMsg: 'Error intentando recuperar el módulo',
                    });
                }
            }),
            catchError(error => {
                let errorMsg: string = 'Error intentando recuperar el módulo';
                if (error && error.error && error.error.error) {
                    errorMsg = error.error.error;
                }

                patchState({
                    success: false,
                    errorMsg: errorMsg,
                });
                throw new Error(error);
            }),
        );
    }
}