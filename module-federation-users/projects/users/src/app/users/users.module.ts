import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { USERS_ROUTES } from './users.routes';
import { UsersService } from './users.service';
import { UsersListComponent } from './components/users-list.component';
import { UsersState } from './store/modules.state';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(USERS_ROUTES),

    HttpClientModule,
    NgxsModule.forFeature([ UsersState ]),
  ],
  declarations: [
    UsersListComponent,
  ],
  providers: [
    UsersService,
  ]
})
export class UsersModule { }
