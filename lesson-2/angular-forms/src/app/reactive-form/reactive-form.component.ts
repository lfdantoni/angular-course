import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'firstName': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'lastName': new FormControl('', Validators.required), // array is not necessary for one validator
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ])
    })
  }

  onSubmit() {
    console.log(this.formGroup.value);
    console.log(this.firstName.errors);
  }

  get firstName(): AbstractControl {
    return this.formGroup.get('firstName');
  }

}
