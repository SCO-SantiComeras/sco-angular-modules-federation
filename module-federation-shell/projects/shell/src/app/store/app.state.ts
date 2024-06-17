import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetApplicationTheme, SetContentHeight, SetDisplayMode } from "./app.actions";
import { DisplayResize } from "./model/display-resize";

export class AppStateModel {
    currentTheme: string;
    displayResize: DisplayResize;
    contentHeight: number;
    success: boolean;
    successMsg: string;
    errorMsg: string;
}

export const AppStateDefaults: AppStateModel = {
    currentTheme: '',
    displayResize: undefined,
    contentHeight: undefined,
    success: false,
    successMsg: undefined,
    errorMsg: undefined,
};

@State<AppStateModel>({
    name: 'app',
    defaults: AppStateDefaults,
}) 

@Injectable()
export class AppState {

    constructor() {}

    @Selector()
    static currentTheme(state: AppStateModel): string {
        return state.currentTheme;
    }

    @Selector()
    static displayResize(state: AppStateModel): DisplayResize {
        return state.displayResize;
    }

    @Selector()
    static contentHeight(state: AppStateModel): number {
        return state.contentHeight;
    }

    @Selector()
    static success(state: AppStateModel): boolean {
        return state.success;
    }

    @Selector()
    static successMsg(state: AppStateModel): string {
        return state.successMsg;
    }

    @Selector()
    static errorMsg(state: AppStateModel): string {
        return state.errorMsg;
    }

    @Action(SetApplicationTheme)
    public setApplicationTheme(
        { patchState }: StateContext<AppStateModel>,
        { payload }: SetApplicationTheme
    ) {
        /* Call to the api and get available theme list and set if selected is ok  */
        patchState({
            currentTheme: payload.theme,
            success: true,
        });
    }

    @Action(SetDisplayMode)
    public setDisplayMode(
        { patchState }: StateContext<AppStateModel>,
        { payload }: SetDisplayMode
    ) {
        patchState({
            displayResize: payload.displayResize,
            success: true,
        });
    }

    @Action(SetContentHeight)
    public setContentHeight(
        { patchState }: StateContext<AppStateModel>,
        { payload }: SetContentHeight
    ) {
        patchState({
            contentHeight: payload.contentHeight,
            success: true,
        });
    }
}