import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ListModules } from '../store/modules.actions';
import { Module } from '../../common/module';
import { ModulesState } from '../store/modules.state';

@Component({
  selector: 'app-modules-list',
  templateUrl: './modules-list.component.html',
  styleUrls: ['./modules-list.component.scss']
})
export class ModulesListComponent implements OnInit {

  public modules: Module[];

  constructor(
    private readonly store: Store,
  ) { 
    this.modules = [];
  }

  ngOnInit() {
    this.store.dispatch(new ListModules()).subscribe({
      next: () => {
        const modules: Module[] = this.store.selectSnapshot(ModulesState.modules);
        if (modules && modules.length > 0) {
          this.modules = modules;
        }
      },
    })
  }

}
