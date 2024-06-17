import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ModulesModule } from './modules/modules.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { environment } from '../environments/environment';
import { WebSocketService } from './websocket/websocket.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ModulesModule,
    RouterModule.forRoot(APP_ROUTES),

    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({ key: [] }),
  ],
  declarations: [
    HomeComponent,
    AppComponent,
  ],
  providers: [
    WebSocketService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
