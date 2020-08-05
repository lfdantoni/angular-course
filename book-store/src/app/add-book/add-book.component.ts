import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { imageUrlValidator } from '../validators/image-url-validator';
import { BookService } from '../services/book/book.service';


export interface CategoryItemModel{
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
  categoryList: CategoryItemModel[] = [];

  constructor(private bookService: BookService) {
    this.formGroup = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      isbn: new FormControl('', [Validators.required, Validators.pattern(/[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*/)]),
      author: new FormControl('', [Validators.required, this.authorValidator]),
      cover: new FormControl('', [Validators.required, imageUrlValidator]),
      stock: new FormControl(null, [Validators.required, Validators.pattern(/[0-9]+/), Validators.min(0)]),
      price: new FormControl(null, [Validators.required, Validators.pattern(/[0-9.]+/), Validators.min(0)]),
      categories: new FormControl([])
    });
  }

  ngOnInit(): void {
    const categories = this.bookService.getCategories();

    this.categoryList = categories.map(cat => ({
      value: cat.code,
      display: cat.display,
      checked: false
    }));
  }

  onSubmit(): void {
    console.log('Submit ', this.formGroup.value);
    this.formGroup.reset();
    this.categories.setValue([]);
    this.categoryList.forEach(cat => cat.checked = false);
  }

  authorValidator(control: FormControl): ValidationErrors {
    const valid = control.value ? control.value.toString().length > 5 : false;
    return !valid ? {author: control.value} : null;
  }

  onCategoryChange(category: CategoryItemModel): void {
    category.checked = !category.checked;

    if (category.checked) {
      this.categories.setValue([category.value].concat(this.categories.value));
    } else {
      const currentCategories: string[] = this.categories.value;

      currentCategories.splice(currentCategories.findIndex(cat => cat === category.value), 1);

      this.categories.setValue(currentCategories);
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
