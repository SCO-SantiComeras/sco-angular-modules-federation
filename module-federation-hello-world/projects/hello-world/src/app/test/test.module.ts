import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TEST_ROUTES } from './test.routes';
import { TestComponent } from './components/test.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TEST_ROUTES)
  ],
  declarations: [
    TestComponent,
  ]
})
export class TestModule { }
