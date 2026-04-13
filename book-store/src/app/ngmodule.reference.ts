// ─────────────────────────────────────────────────────────────────────────────
// NgModule Reference — for reading only, NOT imported anywhere in this project.
//
// Angular projects created before v17 (ng new --no-standalone) use NgModules.
// Students will encounter this pattern in:
//   - Corporate projects built before 2023
//   - Third-party libraries that haven't migrated yet
//   - Institute exams
//
// This file shows how the same BookStore setup looks in NgModule style
// so students can compare it with the standalone approach used in this project.
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. Root module (equivalent of app.config.ts) ─────────────────────────────
//
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';   // ← legacy HTTP setup
// import { RouterModule } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
// import { AppComponent } from './app.component';
// import { BookListComponent } from './components/book-list/book-list.component';
// import { BookDetailComponent } from './components/book-detail/book-detail.component';
// import { AddBookComponent } from './components/add-book/add-book.component';
// import { routes } from './app.routes';
//
// @NgModule({
//   declarations: [
//     // Every component, directive, and pipe must be declared here.
//     // In standalone components, each file declares itself with standalone: true.
//     AppComponent,
//     BookListComponent,
//     BookDetailComponent,
//     AddBookComponent,
//   ],
//   imports: [
//     BrowserModule,
//     // HttpClientModule was how HTTP was enabled before Angular 15.
//     // It was REMOVED in Angular 18. In new projects use:
//     //   provideHttpClient(withFetch()) in app.config.ts
//     HttpClientModule,
//     RouterModule.forRoot(routes),
//     FormsModule,
//     ReactiveFormsModule,
//   ],
//   providers: [
//     // Services with module scope go here.
//     // In standalone, use @Injectable({ providedIn: 'root' }) or app.config providers.
//   ],
//   bootstrap: [AppComponent],   // only in the root module
// })
// export class AppModule {}

// ── 2. Feature module with lazy loading (legacy pattern) ─────────────────────
//
// Lazy loading before standalone used a dedicated NgModule per feature:
//
// // books/books.module.ts
// @NgModule({
//   declarations: [BookListComponent, BookDetailComponent],
//   imports: [CommonModule, RouterModule.forChild(booksRoutes)],
// })
// export class BooksModule {}
//
// // app.routes.ts
// { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) }
//
// In standalone (Angular 17+), loadChildren uses a plain routes array instead:
// { path: 'books', loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes) }

// ── 3. Component declaration comparison ──────────────────────────────────────
//
// NgModule component — must be declared in a module's declarations array:
//
// @Component({ selector: 'app-book', templateUrl: './book.component.html' })
// export class BookComponent {}   // ← no standalone: true, no imports array
// // + added to declarations: [BookComponent] in BookModule or AppModule
//
// Standalone component — self-contained, imported directly where used:
//
// @Component({ selector: 'app-book', standalone: true, imports: [NgStyle], ... })
// export class BookComponent {}   // ← standalone: true is the default in Angular 17+

// ── 4. Generate a legacy project for comparison ───────────────────────────────
//
// ng new book-store-legacy --no-standalone
//   → Creates app.module.ts, AppModule, and all components as NgModule-based.
//   → Compare app.module.ts vs app.config.ts to see the structural difference.
