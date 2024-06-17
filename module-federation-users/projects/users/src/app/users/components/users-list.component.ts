import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from '../../common/user';
import { ListUsers } from '../store/modules.actions';
import { UsersState } from '../store/modules.state';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public users: User[];

  constructor(
    private readonly store: Store,
  ) { 
    this.users = [];
  }

  ngOnInit() {
    this.store.dispatch(new ListUsers()).subscribe({
      next: () => {
        const users: User[] = this.store.selectSnapshot(UsersState.users);
        if (users && users.length > 0) {
          this.users = users;
        }
      },
    })
  }

}
