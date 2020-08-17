
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AuthGuard } from '../shared/guards/auth/auth.guard';

const routes: Routes = [
  { path: 'list', component: BookListComponent },
  { path: 'add', component: AddBookComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddBookComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {}
