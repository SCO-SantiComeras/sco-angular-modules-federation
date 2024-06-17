export class ListUsers {
  static readonly type = '[Users] List users';
}

export class GetUser {
  static readonly type = '[Users] Get user by user name';
  constructor(public payload: { name: string } ) {}
}