import { Injectable } from '@angular/core';
import { Toast } from './model/toast';
import { TOAST_CONSTANTS } from './toast.constants';

@Injectable({
  providedIn: 'root'
})

export class ToastService {

  private _toasts: Toast[];
  private _timeout: number;

  public get toasts(): Toast[] {
    return this._toasts;
  }

  public get timeout(): number {
    return this._timeout;
  }

  public set timeout(value: number) {
    this._timeout = value;
  }

  public readonly TOAST_CONSTANTS = TOAST_CONSTANTS;

  constructor() {
    this._toasts = [];
    this._timeout = this.TOAST_CONSTANTS.TIMEOUT;
  }

  addInfoMessage(message: string): void {
    this.addMessage(message, this.TOAST_CONSTANTS.TYPE_INFO);
  }
  
  addWarningMessage(message: string): void {
    this.addMessage(message, this.TOAST_CONSTANTS.TYPE_WARNING);
  }

  addErrorMessage(message: string): void {
    this.addMessage(message, this.TOAST_CONSTANTS.TYPE_ERROR);
  }

  addSuccessMessage(message: string): void {
    this.addMessage(message, this.TOAST_CONSTANTS.TYPE_SUCCESS);
  }

  private addMessage(message: string, type: string): void {
    const toast = new Toast(message, type);

    if (this._toasts.length < this.TOAST_CONSTANTS.MAX_TOAST) {
      this._toasts.push(toast);
    } else {
      this._toasts = this._toasts.slice(1, this._toasts.length);
      this._toasts.push(toast);
    }

    setTimeout(() => {
      this.closeToast(toast);
    }, this._timeout);
  } 

  closeToast(toast: Toast): void {
    const index: number = this._toasts.findIndex(t => t === toast);
    if (index != -1) {
      this._toasts.splice(index, 1);
    }
  }
}
