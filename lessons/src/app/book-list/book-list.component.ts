import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { booksMock } from '../mock-data/books';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  bookList: Book[] = booksMock;
  card: Book[] = [];

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('params', this.activateRoute.snapshot.params)
    console.log('queryParams', this.activateRoute.snapshot.queryParams)
    const id: string = this.activateRoute.snapshot.params['id'];
    const category: string = this.activateRoute.snapshot.queryParams['category'];

    if(id) {
      const book = booksMock.find(book => book.id === id);
      this.bookList = book ? [book] : []
      return;
    }

    if(category) {
      this.bookList = booksMock.filter(book => book.categories.includes(category))
      return;
    }
  }

  addBookToCart(book: Book) {
    console.log('addBookToCart', book)
    this.card.push(book)
    console.log('card', this.card)
  }
}
