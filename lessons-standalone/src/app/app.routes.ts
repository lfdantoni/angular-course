import { Routes } from '@angular/router';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { authGuard } from './guards/auth/auth.guard';
import { BookListComponent } from './book-list/book-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsComponent } from './forms/forms.component';
import { PostListComponent } from './post-list/post-list.component';

export const routes: Routes = [
  { path: 'data-binding', component: DataBindingComponent, canActivate: [authGuard] },
  { path: 'forms', component: FormsComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'book-list/:category', component: BookListComponent },
  { path: 'posts', component: PostListComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'book-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }
];
