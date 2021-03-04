import { Component, OnInit } from '@angular/core';
import { BookList } from '../mock-data';
import { Book } from '../models/Book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor() {
    this.books = BookList;
  }

  ngOnInit(): void {
  }

  addBookToCart(book: Book): void {
    console.log('BookListComponent addCartBook: ', book);
  }
}
