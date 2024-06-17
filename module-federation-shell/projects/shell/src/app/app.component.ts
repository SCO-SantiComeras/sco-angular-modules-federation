import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SetContentHeight, SetDisplayMode } from './store/app.actions';
import { DisplayResize } from './store/model/display-resize';
import { User } from './auth/model/user';
import { Login, Logout } from './auth/store/auth.actions';
import { AuthState } from './auth/store/auth.state';
import { Observable } from 'rxjs';
import { LoginResponse } from './auth/model/login-response';
import { ToastService } from './toast/toast.service';
import { WebSocketService } from './websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';

  @Select(AuthState.loginResponse) loginResponse$: Observable<LoginResponse>;
  public loginResponse: LoginResponse;

  @ViewChild('header') header: ElementRef;
  @ViewChild('content') content: ElementRef;
  public contentHeight: number;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly store: Store,
    private readonly toastService: ToastService,
    private readonly websocketService: WebSocketService,
  ) { 
    this.loginResponse$.subscribe((loginResponse: LoginResponse) => {
      this.loginResponse = loginResponse;
    });

    this.contentHeight = undefined;
    this.setDisplayMode();

    this.websocketService.connect();
  }
  
  ngAfterViewInit(): void {
    this.contentHeight = window.innerHeight - this.header.nativeElement.offsetHeight;
    this.store.dispatch(new SetContentHeight({ contentHeight: this.contentHeight })).subscribe({
      next: () => {
        this.cdRef.detectChanges();
      }
    });
  }

  /* Login */
  onSubmitLoginForm($event: User): void {
    this.store.dispatch(new Login({ user: $event })).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(AuthState.success);
        if (!success) {
          this.toastService.addErrorMessage(this.store.selectSnapshot(AuthState.errorMsg));
          return;
        }

        this.toastService.addSuccessMessage(this.store.selectSnapshot(AuthState.successMsg));
      },
      error: () => {
        this.toastService.addErrorMessage(this.store.selectSnapshot(AuthState.errorMsg));
      }
    });
  }

  onCancelLoginForm(): void {

  }

  onUserLogout(): void {
    if (!this.loginResponse || (this.loginResponse && !this.loginResponse.user)) {
      return;
    }
    
    this.store.dispatch(new Logout({ user: this.loginResponse.user })).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(AuthState.success);
        if (!success) {
          this.toastService.addErrorMessage(this.store.selectSnapshot(AuthState.errorMsg));
          return;
        }

        this.toastService.addSuccessMessage(this.store.selectSnapshot(AuthState.successMsg));
      },
      error: () => {
        this.toastService.addErrorMessage(this.store.selectSnapshot(AuthState.errorMsg));
      }
    })
  }

  /* Display Mode */
  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    const displayResize: DisplayResize = {
      width: $event.target.innerWidth,
      height: $event.target.innerHeight,
      mode: '',
    };

    this.setDisplayMode(displayResize);
  }

  private setDisplayMode(displayResize: DisplayResize = undefined): void {
    if (!displayResize) {
      displayResize = {
        width: window.innerWidth,
        height: window.innerHeight,
        mode: '', // Make Resolution / Platform mode service to set mode
      };
    }

    this.store.dispatch(new SetDisplayMode({ displayResize: displayResize })).subscribe();
  }

  /* Key Events */
  @HostListener('window:keydown', ['$event'])
  onKeyDown($event: KeyboardEvent) {
    if (!this.loginResponse) {
      if ($event.key.toUpperCase() == 'ENTER') {
        
      } 

      if ($event.key.toUpperCase() == 'ESCAPE') {

      } 
    }
  }
}

