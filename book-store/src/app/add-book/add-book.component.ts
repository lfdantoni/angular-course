import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { imageUrlValidator } from '../validators/image-url-validator';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      isbn: new FormControl('', [Validators.required, Validators.pattern(/[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*/)]),
      author: new FormControl('', [Validators.required, this.authorValidator]),
      cover: new FormControl('', [Validators.required, imageUrlValidator]),
      comment: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Submit ', this.formGroup.value);
    this.formGroup.reset();
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
}
