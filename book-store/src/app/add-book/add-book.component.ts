import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CategoryList } from '../mock-data';
import { BookCategory } from '../models/BookCategory';
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
export class AddBookComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage = '';
  showError = false;
  categoryList: CategoryItemModel[] = [];

  constructor() {
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
    this.categoryList = this.transformBookCategories(CategoryList);
  }

  private transformBookCategories(categories: BookCategory[]): CategoryItemModel[] {
    return categories.map(cat => ({
      value: cat.code,
      display: cat.display,
      checked: false
    }));
  }

  onSubmit() {

  }

  onCategoryChange(category: CategoryItemModel) {

  }

  authorValidator(control: FormControl): ValidationErrors {
    const valid = control.value ? control.value.toString().length > 5 : false;
    return !valid ? {author: control.value} : null;
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
