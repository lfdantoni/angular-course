import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { idValidator } from '../validators/id-validator';

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
      ]),
      'phoneNumber': new FormControl('', this.telephoneValidator(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)),
      'id': new FormControl('', idValidator),
    })
  }

  onSubmit() {
    console.log(this.formGroup.value);
    console.log(this.firstName.errors);
  }

  telephoneValidator(phoneExp: RegExp): ValidatorFn {
    return (control: FormControl): {[key: string]: any} => {
      const isValid = phoneExp ? phoneExp.test(control.value) : true;
      return !isValid ? {'phoneNumber':  {value: control.value} } : null;
    }
  }

  get firstName(): AbstractControl {
    return this.formGroup.get('firstName');
  }

  get phoneNumber(): AbstractControl {
    return this.formGroup.get('phoneNumber');
  }

  get id(): AbstractControl {
    return this.formGroup.get('id');
  }
}
