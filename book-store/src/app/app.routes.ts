import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookListObsComponent } from './components/book-list-obs/book-list-obs.component';
import { AddBookTdfComponent } from './components/add-book-tdf/add-book-tdf.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Redirect root to /books
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  // Book list — Signals version (lesson 4)
  { path: 'books', component: BookListComponent },
  // Book list — Observable/BehaviorSubject version (legacy reference, lesson 4)
  { path: 'books-obs', component: BookListObsComponent },
  // Book detail — :id is a route param read via ActivatedRoute
  { path: 'books/:id', component: BookDetailComponent },
  // Data binding demo (lesson 1 examples)
  { path: 'data-binding', component: DataBindingComponent },
  // Login — Template-Driven Form example; sets mock token in localStorage
  { path: 'login', component: LoginComponent },
  // Add book — Reactive Form version, protected by authGuard
  { path: 'add-book', component: AddBookComponent, canActivate: [authGuard] },
  // Add book — Template-Driven Form version (same feature, different form approach)
  { path: 'add-book-tdf', component: AddBookTdfComponent, canActivate: [authGuard] },
  // Wildcard — must always be last (first-match wins)
  { path: '**', component: NotFoundComponent },
];
