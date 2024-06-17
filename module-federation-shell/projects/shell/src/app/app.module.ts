import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppState } from './store/app.state';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { ToastModule } from './toast/toast.module';
import { WebSocketService } from './websocket/websocket.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    NgxsModule.forRoot([AppState], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({ key: ["auth", "app"] }),

    ToastModule,
    AuthModule,
    PagesModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    WebSocketService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
