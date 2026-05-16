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
  @Output() viewDetail = new EventEmitter<Book>();

  onAdd(event: MouseEvent) {
    event.stopPropagation();
    this.addToCart.emit(this.book);
  }

  onViewDetail() {
    this.viewDetail.emit(this.book);
  }
}
