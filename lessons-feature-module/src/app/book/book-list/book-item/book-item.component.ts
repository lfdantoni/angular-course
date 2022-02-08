import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-item-book',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent{
  @Input() book: Book;
  @Output() addBookToCartEvent = new EventEmitter<Book>()
  // bgImageUrl: string;
  get bgImageUrl(): string {
    return `url('${this.book.cover}')`;
  }


  constructor() { }

  onAddCart() {
    this.addBookToCartEvent.emit(this.book);
  }

}
