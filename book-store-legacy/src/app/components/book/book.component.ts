import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  @Input({ required: true }) book!: Book;
  @Output() addToCart = new EventEmitter<Book>();

  onAdd() {
    this.addToCart.emit(this.book);
  }
}
