import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  // @Input() book?: Book;
  book = input.required<Book>();
  // @Output() addBookToCartEvent = new EventEmitter<Book>()
  addBookToCartEvent = output<Book>();


  // bgImageUrl: string;
  get bgImageUrl(): string {
    // return `url('${this.book?.cover}')`;
    return `url('${this.book()?.cover}')`;
  }

  constructor() { }

  onAddCart() {
    // this.addBookToCartEvent.emit(this.book);
    this.addBookToCartEvent.emit(this.book());
  }
}
