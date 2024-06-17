import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './component/toast.component';
import { ToastService } from './toast.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    ToastComponent,
  ],
  exports: [
    ToastComponent,
  ],
  providers: [
    ToastService,
  ]
})
export class ToastModule { }
