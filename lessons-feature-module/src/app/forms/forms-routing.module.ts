import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsPageComponent } from './forms-page.component';

const routes: Routes = [
  {
    path: '',
    component: FormsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {}
