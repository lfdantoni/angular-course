import { Routes } from '@angular/router';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookListObsComponent } from './components/book-list-obs/book-list-obs.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

// ── Lesson 5 approach (eager loading) — replaced in lesson 6 by loadComponent/loadChildren ──
// All components were imported at the top and bundled into the initial JS chunk.
// The browser downloaded every component on first load, even ones the user never visited.
//
// import { BookListComponent } from './components/book-list/book-list.component';
// import { BookDetailComponent } from './components/book-detail/book-detail.component';
// import { AddBookComponent } from './components/add-book/add-book.component';
// import { AddBookTdfComponent } from './components/add-book-tdf/add-book-tdf.component';
//
// { path: 'books', component: BookListComponent },
// { path: 'books/:id', component: BookDetailComponent },
// { path: 'add-book', component: AddBookComponent, canActivate: [authGuard] },
// { path: 'add-book-tdf', component: AddBookTdfComponent, canActivate: [authGuard] },
// ─────────────────────────────────────────────────────────────────────────────────────────────

export const routes: Routes = [
  // Redirect root to /books
  { path: '', redirectTo: '/books', pathMatch: 'full' },

  // loadChildren: the entire books feature (list + detail) is bundled as a separate JS chunk.
  // Angular only downloads it when the user navigates to /books for the first time.
  // The chunk contains BookListComponent + BookDetailComponent + all their dependencies.
  {
    path: 'books',
    loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes),
  },

  // loadComponent: single lazy component — its own separate JS chunk.
  // Downloaded only when the user visits /add-book (and passes the authGuard).
  {
    path: 'add-book',
    loadComponent: () =>
      import('./components/add-book/add-book.component').then(m => m.AddBookComponent),
    canActivate: [authGuard],
  },

  // loadComponent: same pattern for the TDF version
  {
    path: 'add-book-tdf',
    loadComponent: () =>
      import('./components/add-book-tdf/add-book-tdf.component').then(m => m.AddBookTdfComponent),
    canActivate: [authGuard],
  },

  // These routes remain eager — they are small and always needed
  { path: 'books-obs', component: BookListObsComponent },
  { path: 'data-binding', component: DataBindingComponent },
  { path: 'login', component: LoginComponent },

  // Wildcard — must always be last (first-match wins)
  { path: '**', component: NotFoundComponent },
];
