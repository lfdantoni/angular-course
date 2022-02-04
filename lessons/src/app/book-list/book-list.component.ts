import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Book } from '../models/book';
import { BookCategory } from '../models/book-category';
import { BookService } from '../services/book/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  bookList: Book[] = [];
  bookCategories: BookCategory[] = [];
  isLoading = false;
  isBooksLoading = false;
  bookSubscription: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.isLoading = true;

    // this.bookSubscription = this.bookService.getBooks()
    //   .subscribe(books => {
    //     this.bookList = books;
    //     this.isLoading = false;
    //   })

    // this.bookService.getBooks()
    //   .pipe(first())
    //   .subscribe(books => {
    //     this.bookList = books;
    //     this.isLoading = false;
    //   });

    // this.bookService.getCategories()
    //   .pipe(first())
    //   .subscribe(categories => {
    //     this.bookCategories = categories;
    //     this.isLoading = false;
    //   });

    // forkJoin([ this.bookService.getBooks(),  this.bookService.getCategories()])
    //   .pipe(first())
    //   .subscribe(([books, categories]) => {
    //     this.bookList = books;
    //     this.bookCategories = categories;
    //     this.isLoading = false;
    //   },
    //   error => console.log('ERROR!', error))

    forkJoin([ this.bookService.getBooks(),  this.bookService.getCategories()])
      .pipe(first())
      .subscribe({
        next: ([books, categories]) => {
          this.bookList = books;
          this.bookCategories = categories;
          this.isLoading = false;
        },
        error: error => console.log('ERROR!', error),
        complete: () => console.log('Execution complete!'),
      })
  }

  ngOnDestroy(): void {
    // this.bookSubscription?.unsubscribe();
  }

  addBookToCart(book: Book) {
    console.log('addBookToCart', book)
  }

  onFilterChange(target: EventTarget | null) {
    const value = target ? (target as HTMLSelectElement).value : '';
    const valueToFilter = value === 'all' ? '' : value;

    console.log('onFilterChange', value)
    if(!value) return;

    this.isBooksLoading = true;

    this.bookService.getBooksByCategory(valueToFilter)
      .pipe(first())
      .subscribe(books => {
        this.bookList = books;
        this.isBooksLoading = false;
      })

      // Map example
      // this.bookService.getBooksByCategory(valueToFilter)
      // .pipe(first(), map(books => books.map(book => book.title)))
      // .subscribe(books => {
      //   console.log(books)
      // })

      // Map with array filter
      // this.bookService.getBooks()
      // .pipe(
      //   first(),
      //   map(books=>
      //     books.filter(book => valueToFilter ?
      //       book.categories.includes(valueToFilter) : true)))
      // .subscribe(books => {
      //   console.log(books)
      //   this.bookList = books;
      //   this.isBooksLoading = false;
      // })

    console.log(target ? (target as HTMLSelectElement).value : '' )
  }
}
