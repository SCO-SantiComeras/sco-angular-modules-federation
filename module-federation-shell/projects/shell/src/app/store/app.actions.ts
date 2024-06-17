import { DisplayResize } from "./model/display-resize";

export class SetApplicationTheme {
  static readonly type = '[App] Set Application Theme';
  constructor(public payload: { theme: string } ) {}
}

export class SetDisplayMode {
  static readonly type = '[App] Set Application Display Mode';
  constructor(public payload: { displayResize: DisplayResize } ) {}
}

export class SetContentHeight {
  static readonly type = '[App] Set Content Height';
  constructor(public payload: { contentHeight: number } ) {}
}