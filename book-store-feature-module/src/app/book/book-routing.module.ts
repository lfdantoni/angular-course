
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { BookPageComponent } from './book-page.component';

const routes: Routes = [
  {
    path: '',
    component: BookPageComponent,
    children: [
      { path: '', component: BookListComponent, pathMatch: 'full' },
      { path: 'add', component: AddBookComponent },
      { path: 'edit/:id', component: AddBookComponent, canActivate: [AuthGuard]},
    ]
  },
  // { path: '/add', component: AddBookComponent, canActivate: [AuthGuard] },
  // { path: 'edit/:id', component: AddBookComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {}
