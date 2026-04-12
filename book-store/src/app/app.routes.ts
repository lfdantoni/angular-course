import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Redirect root to /books
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  // Book list — supports ?category=... queryParam
  { path: 'books', component: BookListComponent },
  // Book detail — :id is a route param read via ActivatedRoute
  { path: 'books/:id', component: BookDetailComponent },
  // Data binding demo (lesson 1 examples)
  { path: 'data-binding', component: DataBindingComponent },
  // Login — Template-Driven Form example; sets mock token in localStorage
  { path: 'login', component: LoginComponent },
  // Add book — protected by authGuard (redirects to /login if no token)
  { path: 'add-book', component: AddBookComponent, canActivate: [authGuard] },
  // Wildcard — must always be last (first-match wins)
  { path: '**', component: NotFoundComponent },
];
