import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './services/book/book.service';
import { BookRoutingModule } from './book-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { BookItemStatusDirective } from './book-list/book-item/book-item-status.directive';
import { BookListPageComponent } from './book-list-page.component';



@NgModule({
  declarations: [
    BookListComponent,
    BookItemComponent,
    BookItemStatusDirective,
    BookListPageComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
  ],
  providers: [
    BookService
    // {provide: BookService, useClass: BookService},  // Helpful to override logic with an inherited class
  ]
})
export class BookListModule { }
