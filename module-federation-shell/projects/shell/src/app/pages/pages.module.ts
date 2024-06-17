import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
  ],
  declarations: [
    PagesComponent,
  ],
  exports: [
    PagesComponent,
  ],
  providers: [

  ],
})
export class PagesModule { }
