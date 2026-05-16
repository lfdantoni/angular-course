import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { App } from './app';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BookComponent } from './components/book/book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookStatusDirective } from './directives/book-status.directive';

@NgModule({
  declarations: [
    App,
    NavBarComponent,
    BookComponent,
    BookListComponent,
    BookDetailComponent,
    DataBindingComponent,
    NotFoundComponent,
    BookStatusDirective,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App],
})
export class AppModule {}
