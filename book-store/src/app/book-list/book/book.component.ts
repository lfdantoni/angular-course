import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: Book;

  @Output() addBookToCartEvent: EventEmitter<Book> = new EventEmitter();

  // bgImageUrl: string;
  get bgImageUrl(): string {
    return `url('${this.book.cover}')`;
  }


  constructor() {
    // this.bgImageUrl = `url('${this.coverImage}')`;
  }

  ngOnInit(): void {
  }

  onAddCart(): void {
    console.log('BookComponent added ', this.book);
    this.addBookToCartEvent.emit(this.book);
  }
}
