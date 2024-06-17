import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User } from "../../common/user";
import { Injectable } from "@angular/core";
import { UsersService } from "../users.service";
import { catchError, map, tap } from 'rxjs/operators';
import { GetUser, ListUsers } from "./modules.actions";

export class UsersStateModel {
    users: User[];
    user: User;
    success: boolean;
    successMsg: string;
    errorMsg: string;
}

export const UsersStateDefaults: UsersStateModel = {
    users: undefined,
    user: undefined,
    success: false,
    successMsg: undefined,
    errorMsg: undefined,
};

@State<UsersStateModel>({
    name: 'users',
    defaults: UsersStateDefaults,
}) 

@Injectable()
export class UsersState {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Selector()
    static users(state: UsersStateModel): User[] {
        return state.users;
    }

    @Selector()
    static user(state: UsersStateModel): User {
        return state.user;
    }

    @Selector()
    static success(state: UsersStateModel): boolean {
        return state.success;
    }

    @Selector()
    static successMsg(state: UsersStateModel): string {
        return state.successMsg;
    }

    @Selector()
    static errorMsg(state: UsersStateModel): string {
        return state.errorMsg;
    }

    @Action(ListUsers)
    public listUsers(
        { patchState }: StateContext<UsersStateModel>
    ) {
        return this.usersService.listUsers().pipe(
            map((users: User[]) => {
                if (users && users.length > 0) {
                    patchState({
                        users: users
                    });
                } else {
                    patchState({
                        users: []
                    });
                }
            })
        );
    }

    @Action(GetUser)
    public etUser(
        { patchState }: StateContext<UsersStateModel>,
        { payload }: GetUser
    ) {
        return this.usersService.getUser(payload.name).pipe(
            tap((user: User) => {
                if (user) {
                    patchState({
                        user: user,
                        success: true,
                        successMsg: 'Usuario recuperado con éxito',
                    });
                } else {
                    patchState({
                        success: false,
                        errorMsg: 'Error intentando recuperar el usuario',
                    });
                }
            }),
            catchError(error => {
                let errorMsg: string = 'Error intentando recuperar el usuario';
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