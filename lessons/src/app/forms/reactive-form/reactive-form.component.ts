import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators, FormGroup } from '@angular/forms';
import {idValidator} from '../../validators/id-validator';
import {countries} from '../../mock-data/countries';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  formGroup: FormGroup;
  countries = countries;

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      lastName: new FormControl('', Validators.required), // array is not necessary for one validator
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phoneNumber: new FormControl('', this.telephoneValidator(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)),
      id: new FormControl('', idValidator),
      comment: new FormControl({value: 'comment text', disabled: false}),
      country: new FormControl('', Validators.required),
      age: new FormControl(0, [Validators.required, Validators.min(18)]),
      gender: new FormControl('', Validators.required),
      tc: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
    console.log(this.firstName.errors);
  }

  telephoneValidator(phoneExp: RegExp): ValidatorFn {
    return (control: FormControl): {[key: string]: any} => {
      const isValid = phoneExp ? phoneExp.test(control.value) : true;
      return !isValid ? {phoneNumber:  {value: control.value} } : null;
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

  get age(): AbstractControl {
    return this.formGroup.get('age');
  }

  get tc(): AbstractControl {
    return this.formGroup.get('tc');
  }

}
