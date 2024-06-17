import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list.component';

export const USERS_ROUTES: Routes = [
    {
      path: 'users-list',
      component: UsersListComponent,
    }
];
