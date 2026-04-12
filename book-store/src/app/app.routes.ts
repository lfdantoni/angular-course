import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  // Redirect root to /books
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  // Book list — supports ?category=... queryParam
  { path: 'books', component: BookListComponent },
  // Book detail — :id is a route param read via ActivatedRoute
  { path: 'books/:id', component: BookDetailComponent },
  // Data binding demo (lesson 1 examples)
  { path: 'data-binding', component: DataBindingComponent },
  // Wildcard — must always be last (first-match wins)
  { path: '**', component: NotFoundComponent },
];
