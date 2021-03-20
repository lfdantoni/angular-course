import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, takeWhile } from 'rxjs/operators';
import { Book } from '../models/Book';
import { BookCategory } from '../models/BookCategory';
import { BookService } from '../services/book/book.service';
import { imageUrlValidator } from '../validators/image-url-validator';

export interface CategoryItemModel {
  value: string;
  display: string;
  checked: boolean;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  errorMessage = '';
  showError = false;
  categoryList: CategoryItemModel[] = [];
  isLoading = true;
  alive = true;

  constructor(private bookService: BookService, private activateRoute: ActivatedRoute, private router: Router) {
    this.formGroup = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      isbn: new FormControl('', [Validators.required, Validators.pattern(/[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*/)]),
      author: new FormControl('', [Validators.required, this.authorValidator]),
      cover: new FormControl('', [Validators.required, imageUrlValidator]),
      stock: new FormControl(null, [Validators.required, Validators.pattern(/[0-9]+/), Validators.min(0)]),
      price: new FormControl(null, [Validators.required, Validators.pattern(/[0-9.]+/), Validators.min(0)]),
      categories: new FormControl([])
    })
  }

  ngOnInit(): void {
    // this.categoryList = this.transformBookCategories(this.bookService.getCategories());
    this.isLoading = true;

    this.bookService.getCategories()
      .pipe(
        first(),
        map(cats => this.transformBookCategories(cats)))
      .subscribe(categories => {
        this.isLoading = false;
        this.categoryList = categories;
        this.checkSelectedCategories();
      });

    this.activateRoute.params
      .pipe(takeWhile(() => this.alive))
      .subscribe(params => {
        const bookId = params.id;

        if(bookId) {
          this.bookService.getBookById(bookId)
            .pipe(first())
            .subscribe(book => {
              this.formGroup.setValue(book);
              this.checkSelectedCategories();
            })
        }
      })
  }

  ngOnDestroy() {
    this.alive = true;
  }

  private checkSelectedCategories() {
    const currentCategories: string[] = this.categories.value;

    if(currentCategories.length) {
      this.categoryList.forEach(c => {
        c.checked = currentCategories.indexOf(c.value) >= 0;
      })
    }
  }

  private transformBookCategories(categories: BookCategory[]): CategoryItemModel[] {
    return categories.map(cat => ({
      value: cat.code,
      display: cat.display,
      checked: false
    }));
  }

  onSubmit() {
    console.log('Submit ', this.formGroup.value);
    // TODO show loading

    if(this.id.value) {
      this.bookService.saveEditBook(this.formGroup.value)
      .pipe(first())
      .subscribe((book) => {
        this.resetForm();
        this.router.navigate(['']);
      },
      (error) => this.handleError(error));
    } else {
      this.bookService.saveNewBook(this.formGroup.value)
        .pipe(first())
        .subscribe((book) => {
          this.resetForm();
          this.router.navigate(['']);
        },
        (error) => this.handleError(error));
    }
  }

  resetForm(): void {
    this.formGroup.reset();
    this.categories.setValue([]);
    this.categoryList.forEach(cat => cat.checked = false);
    this.showError = false;
  }

  onDeleteBook(): void {
    // TODO add loading
    if (this.id.value) {
      this.bookService.deleteBook(this.id.value)
      .pipe(first())
      .subscribe(book => {
        this.resetForm();
      },
      (error) => this.handleError(error));
    }
  }

  onCategoryChange(category: CategoryItemModel) {
    category.checked = !category.checked;

    if(category.checked) {
      const categories: string[] = (this.categories.value as string[]).concat([]);

      categories.push(category.value);

      this.categories.setValue(categories);

      console.log(this.formGroup.value);
    } else {
      const categories: string[] = (this.categories.value as string[]).concat([]);

      const index = categories.indexOf(category.value);

      categories.splice(index, 1);

      this.categories.setValue(categories);
      console.log(this.formGroup.value);
    }
  }

  authorValidator(control: FormControl): ValidationErrors {
    const valid = control.value ? control.value.toString().length > 5 : false;
    return !valid ? {author: control.value} : null;
  }

  handleError(error: HttpErrorResponse): void {
    this.showError = true;

    switch(error.status) {
      case 404:
        this.errorMessage = 'Book does not exist';
        break;
      case 400:
        this.errorMessage = `Invalid information. ${error.error.message}`;
        break;
      case 500:
        this.errorMessage = 'Unexpected error, try again later please.';
        break;
      default:
        this.errorMessage = 'Something went wrong try again later.';
    }
  }

  get title(): AbstractControl {
    return this.formGroup.get('title');
  }

  get isbn(): AbstractControl {
    return this.formGroup.get('isbn');
  }

  get author(): AbstractControl {
    return this.formGroup.get('author');
  }

  get cover(): AbstractControl {
    return this.formGroup.get('cover');
  }

  get id(): AbstractControl {
    return this.formGroup.get('id');
  }

  get stock(): AbstractControl {
    return this.formGroup.get('stock');
  }

  get price(): AbstractControl {
    return this.formGroup.get('price');
  }

  get categories(): AbstractControl {
    return this.formGroup.get('categories');
  }
}
