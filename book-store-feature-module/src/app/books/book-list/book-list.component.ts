import { Component, OnInit, OnDestroy } from '@angular/core';
import {CartService} from '../services/cart/cart.service';
import { Subscription } from 'rxjs';
import { first, takeWhile } from 'rxjs/operators';
import { Book } from '../models/book';
import { BookCategory } from '../models/book-category';
import { BooksService } from '../services/books/books.service';
import { CartSummary } from '../models/cart-summary';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  categories: BookCategory[] = [];
  bookSubscription?: Subscription;
  alive = true;

  constructor(
    private cartService: CartService,
    private bookService: BooksService,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // TODO show loading

    // this.bookSubscription = this.bookService.getBooks()
    //   .subscribe(books => {
    //     this.books = books;
    //   });

    // this.bookService.getBooks()
    //   .pipe(first())
    //   .subscribe(books => {
    //     this.books = books;
    //   });

      this.activateRoute.queryParams
      .pipe(takeWhile(() => this.alive))
      .subscribe((queryParams) => {
        const category = queryParams['category'];

        if(category) {
          this.bookService.getBooksByCategory(category)
            .pipe(takeWhile(() => this.alive))
            .subscribe((books: Book[]) => {
              this.books = books;
            })

          return;
        }


        this.bookService.getBooks()
          .pipe(first())
          .subscribe(books => {
            this.books = books;
          });
      })

    this.bookService.getCategories()
      .pipe(takeWhile(() => this.alive))
      .pipe(first())
      .subscribe(data => {
        this.categories = data;
      });

  }

  ngOnDestroy(): void {
    // if (this.bookSubscription) {
    //   this.bookSubscription.unsubscribe();
    // }

    this.alive = false;
  }

  addBookToCart(book: Book): void {
    console.log('BookListComponent addCartBook: ', book);
    this.cartService.addBook(book);
  }

  // get categories(): BookCategory[] {
  //   return this.bookService.getCategories();
  // }

  get cartSummarize(): CartSummary{
    return this.cartService.getSummarize();
  }

}
