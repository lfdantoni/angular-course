import { Component, OnInit } from '@angular/core';
import { BookComponent } from './book/book.component';
import { booksMock } from '../mock-data/books';
import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [BookComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit { // https://angular.dev/guide/components/lifecycle
  bookList: Book[] = booksMock;
  card: Book[] = [];

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('params', this.activateRoute.snapshot.params)
    console.log('queryParams', this.activateRoute.snapshot.queryParams)
    const category: string = this.activateRoute.snapshot.params['category'];

    if(category) {
      this.bookList = booksMock.filter(book => book.categories.includes(category))
    }
  }

  addBookToCart(book: Book) {
    console.log('addBookToCart', book)
    this.card.push(book)
    console.log('card', this.card)
  }
}
