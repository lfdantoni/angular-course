import { Component, input, output } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Book } from '../../models/book';
import { BookStatusDirective } from '../../directives/book-status.directive';

@Component({
  selector: 'app-book',
  imports: [BookStatusDirective, NgStyle],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  book = input.required<Book>();
  addToCart = output<Book>();
  viewDetail = output<Book>();

  onAdd(event: MouseEvent) {
    // stopPropagation prevents this click from bubbling up to the card click handler
    event.stopPropagation();
    this.addToCart.emit(this.book());
  }

  onViewDetail() {
    this.viewDetail.emit(this.book());
  }
}
