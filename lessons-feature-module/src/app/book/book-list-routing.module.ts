import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
    children: [
      { path: '', component: BookListComponent, pathMatch: 'full' },
      { path: 'list', component: BookListComponent, pathMatch: 'full' },
      {path: 'list/:category', component: BookListComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {}
