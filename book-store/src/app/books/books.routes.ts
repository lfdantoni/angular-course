import { Routes } from '@angular/router';
import { BookListComponent } from '../components/book-list/book-list.component';
import { BookDetailComponent } from '../components/book-detail/book-detail.component';

// Feature route config for the /books prefix.
// This file is the entry point of the lazy-loaded books chunk.
// Angular bundles everything imported here (BookListComponent, BookDetailComponent)
// into a separate JS file — not downloaded until the user navigates to /books.
export const booksRoutes: Routes = [
  // '' matches /books exactly
  { path: '', component: BookListComponent },

  // ':id' matches /books/1, /books/2, etc.
  { path: ':id', component: BookDetailComponent },

  // loadComponent within loadChildren: double lazy loading.
  // The add-book chunk is NOT downloaded even when the /books chunk loads.
  // It only downloads when the user navigates to /books/add (and passes the guard).
  // {
  //   path: 'add',
  //   loadComponent: () =>
  //     import('../components/add-book/add-book.component').then(m => m.AddBookComponent),
  //   canActivate: [authGuard],
  // },
];
