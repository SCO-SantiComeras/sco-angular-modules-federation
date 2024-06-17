import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;
  public errors: any;

  @Output() onCancel: EventEmitter<void>;
  @Output() onSubmit: EventEmitter<User>;

  constructor() {
    this.onCancel = new EventEmitter<void>();
    this.onSubmit = new EventEmitter<User>();

    this.loginForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    this.errors = {};
  }

  onCancelForm(): void {
    this.loginForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.errors = {};
    this.onCancel.emit();
  }

  async onSubmitForm(): Promise<void> {
    const loginData: User = this.loginForm.value;

    if (!this.validateFormValues(loginData)) {
      return;
    }

    this.onSubmit.emit(loginData);
  }

  private validateFormValues(loginData: User): boolean {
    this.errors = {};

    if (!loginData.name) {
      this.errors['name'] = 'Nombre no informado';
    }

    if (!loginData.password) {
      this.errors['password'] = 'Contraseña no informada';
    }

    if (this.errors && Object.values(this.errors).length > 0) {
      return false;
    }

    return true;
  }
}
