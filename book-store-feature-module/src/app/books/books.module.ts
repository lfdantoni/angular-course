import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { SharedModule } from '../shared/shared.module';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksService } from './services/books/books.service';
import { BookComponent } from './book-list/book/book.component';
import { FilterComponent } from './book-list/filter/filter.component';
import { BookStatusDirective } from './book-list/book/book-status.directive';
import { CartService } from './services/cart/cart.service';


@NgModule({
  declarations: [
    BooksComponent,
    BookListComponent,
    AddBookComponent,
    BookComponent,
    FilterComponent,
    BookStatusDirective
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ],
  providers: [
    BooksService,
    CartService
  ]
})
export class BooksModule { }
