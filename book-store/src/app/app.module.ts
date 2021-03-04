import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book-list/book/book.component';
import { BookStatusDirective } from './book-list/book/book-status.directive';

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    BookListComponent,
    BookComponent,
    BookStatusDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
