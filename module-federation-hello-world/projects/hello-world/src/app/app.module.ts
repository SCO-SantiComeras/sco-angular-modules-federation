import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from './test/test.module';
import { WebSocketService } from './websocket/websocket.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    TestModule,
    RouterModule.forRoot(APP_ROUTES)
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
