import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { App } from './app';
import { BookComponent } from './components/book/book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { BookStatusDirective } from './directives/book-status.directive';

@NgModule({
  declarations: [
    App,
    BookComponent,
    BookListComponent,
    DataBindingComponent,
    BookStatusDirective,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App],
})
export class AppModule {}
