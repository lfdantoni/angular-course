import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { AddBookComponent } from './add-book/add-book.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  { path: '', component: BookListComponent, pathMatch: 'full' }, // <-- remove if you dont want to use lazy loading
  // { path: 'books', component: BookListComponent }, // <-- uncomment this line if you dont want to use lazy loading
  { path: 'add', component: AddBookComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddBookComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
