import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './book-list/filter/filter.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book-list/book/book.component';
import { BookStatusDirective } from './book-list/book/book-status.directive';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FilterComponent,
    BookListComponent,
    BookComponent,
    BookStatusDirective,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
