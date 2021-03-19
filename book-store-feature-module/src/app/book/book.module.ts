import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookStatusDirective } from './book-list/book/book-status.directive';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book-list/book/book.component';
import { FilterComponent } from './book-list/filter/filter.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookService } from './services/book/book.service';
import { BookPageComponent } from './book-page.component';

@NgModule({
  declarations: [
    BookStatusDirective,
    BookListComponent,
    BookComponent,
    BookPageComponent,
    FilterComponent,
    AddBookComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule
  ],
  exports: [AddBookComponent, BookListComponent],
  providers: [BookService]
})
export class BookModule { }
