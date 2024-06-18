import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Select } from '@ngxs/store';
import { Route, Router } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { AuthState } from '../auth/store/auth.state';
import { LoginResponse } from '../auth/model/login-response';
import { Module } from '../common/module';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PagesComponent implements OnInit {

  @Select(AppState.contentHeight) contentHeight$: Observable<number>;
  public contentHeight: number;

  @Select(AuthState.loginResponse) loginResponse$: Observable<LoginResponse>;
  public loginResponse: LoginResponse;

  constructor(
    private readonly router: Router,
  ) {
    this.contentHeight$.subscribe((contentHeight: number) => {
      this.contentHeight = contentHeight;
    });
    
    this.loginResponse$.subscribe((loginResponse: LoginResponse) => {
      this.loginResponse = loginResponse;
    });
  }

  ngOnInit(): void {
    this.createMenuRoutes();
  }

  async onClickMenuItem(url: string) {
    await this.router.navigateByUrl(url);
  }

  private createMenuRoutes(): void {
    if (this.loginResponse && this.loginResponse.menu && this.loginResponse.menu.length > 0) {
      for (const menuItem of this.loginResponse.menu) {
        if (!menuItem.react) {
          this.router.config.push(this.loadAngularFederationModule(menuItem));
        } else {
          this.router.config.push(this.loadReactDynamicModule(menuItem));
        }
      }
      
      this.router.resetConfig(this.router.config); 
    }
  }

  private loadAngularFederationModule(menuItem: Module): Route {
    const newRoute: Route = {
      path: menuItem.path,
      loadChildren: () =>
        loadRemoteModule({
          type: menuItem.type,
          remoteName: menuItem.remoteName,
          exposedModule: menuItem.exposedModule,
        }).then((m) => m[menuItem.moduleName]),
    };

    return newRoute;
  }

  private loadReactDynamicModule(menuItem: Module): Route {
    const newRoute: Route = {
      path: menuItem.path,
      component: WebComponentWrapper,
      data: {
        type: menuItem.type,
        remoteEntry: menuItem.remoteEntry,
        remoteName: menuItem.remoteName,
        exposedModule: menuItem.exposedModule,
        elementName: menuItem.moduleName,
      } as WebComponentWrapperOptions,
    };

    return newRoute;
  }
}
