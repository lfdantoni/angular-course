import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book',
  standalone: false,

  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  @Input() book?: Book;
  @Output() addBookToCartEvent = new EventEmitter<Book>()
  // bgImageUrl: string;
  get bgImageUrl(): string {
    return `url('${this.book?.cover}')`;
  }

  constructor() { }

  onAddCart() {
    this.addBookToCartEvent.emit(this.book);
  }
}
