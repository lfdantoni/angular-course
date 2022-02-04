import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { first, map, takeWhile } from 'rxjs/operators';
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
  alive = true;
  bookSubscription: Subscription;
  categoryControl = new FormControl('all');

  constructor(
    private bookService: BookService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.isBooksLoading = true;


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

    // forkJoin([ this.bookService.getBooks(),  this.bookService.getCategories()])
    //   .pipe(first())
    //   .subscribe({
    //     next: ([books, categories]) => {
    //       this.bookList = books;
    //       this.bookCategories = categories;
    //       this.isLoading = false;
    //     },
    //     error: error => console.log('ERROR!', error),
    //     complete: () => console.log('Execution complete!'),
    //   })


    this.bookService.getCategories()
      .pipe(first())
      .subscribe({
        next: categories => {
        this.bookCategories = categories;
        this.isLoading = false;
        this.addCategoryParamListener()
      },
      error: error => console.log('ERROR!', error),
      complete: () => console.log('Execution complete!'),
    })

  }

  addCategoryParamListener() {
    // Router example
    this.activateRoute.params
      .pipe(takeWhile(() => this.alive))
      .subscribe(params => {
        const category = params['category'];
        console.log('category', category)

        this.isBooksLoading = true;
        this.bookService.getBooksByCategory(category || '')
          .pipe(first())
          .subscribe(books => {
            console.log('addCategoryParamListener',books)
            this.categoryControl.setValue(category || 'all')
            this.bookList = books;
            this.isBooksLoading = false;
          })

      })
  }

  ngOnDestroy(): void {
    // this.bookSubscription?.unsubscribe();
    this.alive = false;
  }

  addBookToCart(book: Book) {
    console.log('addBookToCart', book)
  }

  onFilterChange(target: EventTarget | null) {
    const value = target ? (target as HTMLSelectElement).value : '';
    const valueToFilter = value === 'all' ? '' : value;

    console.log('onFilterChange', value)
    if(!value) return;

    this.router.navigate(['book-list', valueToFilter])
    // this.isBooksLoading = true;

    // this.bookService.getBooksByCategory(valueToFilter)
    //   .pipe(first())
    //   .subscribe(books => {
    //     this.bookList = books;
    //     this.isBooksLoading = false;
    //   })

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
