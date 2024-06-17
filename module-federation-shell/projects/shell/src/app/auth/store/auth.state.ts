import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { Login, Logout } from "./auth.actions";
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse } from "../model/login-response";

export class AuthStateModel {
    loginResponse: LoginResponse;
    success: boolean;
    successMsg: string;
    errorMsg: string;
}

export const AuthStateDefaults: AuthStateModel = {
    loginResponse: undefined,
    success: false,
    successMsg: undefined,
    errorMsg: undefined,
};

@State<AuthStateModel>({
    name: 'auth',
    defaults: AuthStateDefaults,
}) 

@Injectable()
export class AuthState {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Selector()
    static loginResponse(state: AuthStateModel): LoginResponse {
        return state.loginResponse;
    }

    @Selector()
    static success(state: AuthStateModel): boolean {
        return state.success;
    }

    @Selector()
    static successMsg(state: AuthStateModel): string {
        return state.successMsg;
    }

    @Selector()
    static errorMsg(state: AuthStateModel): string {
        return state.errorMsg;
    }

    @Action(Login)
    public login(
        { patchState }: StateContext<AuthStateModel>,
        { payload }: Login
    ) {
        return this.authService.login(payload.user).pipe(
            tap((loginResponse: LoginResponse) => {
                if (loginResponse && loginResponse.user && loginResponse.menu) {
                    patchState({
                        success: true,
                        loginResponse: loginResponse,
                        successMsg: 'Sesión iniciada con éxito',
                    });
                } else {
                    patchState({
                        success: false,
                        loginResponse: undefined,
                        errorMsg: 'Error intentando iniciar sesión',
                    });
                }
            }),
            catchError(error => {
                let errorMsg: string = 'Error intentando iniciar sesión';
                if (error && error.error && error.error.error) {
                    errorMsg = error.error.error;
                }

                patchState({
                    success: false,
                    loginResponse: undefined,
                    errorMsg: errorMsg,
                });
                throw new Error(error);
            }),
        );
    }

    @Action(Logout)
    public Logout(
        { patchState }: StateContext<AuthStateModel>,
        { payload }: Logout
    ) {
        return this.authService.logout(payload.user).pipe(
            tap((result: boolean) => {
                if (result) {
                    patchState({
                        success: result,
                        loginResponse: undefined,
                        successMsg: 'Sesión cerrada con éxito',
                    });
                } else {
                    patchState({
                        success: result,
                        errorMsg: 'Error intentando cerrar sesión',
                    });
                }
            }),
            catchError(error => {
                let errorMsg: string = 'Error intentando cerrar sesión';
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