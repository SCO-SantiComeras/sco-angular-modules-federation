import { User } from "../model/user";

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { user: User } ) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
  constructor(public payload: { user: User } ) {}
}