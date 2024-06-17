import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MODULES_ROUTES } from './modules.routes';
import { ModulesListComponent } from './components/modules-list.component';
import { ModulesService } from './modules.service';
import { ModulesState } from './store/modules.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MODULES_ROUTES),

    HttpClientModule,
    NgxsModule.forFeature([ ModulesState ]),
  ],
  declarations: [
    ModulesListComponent,
  ],
  providers: [
    ModulesService,
  ]
})
export class ModulesModule { }
