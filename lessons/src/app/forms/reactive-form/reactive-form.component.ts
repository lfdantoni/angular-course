import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators, FormGroup } from '@angular/forms';
import {idValidator} from '../../validators/id-validator';
import {matchFields} from '../../validators/match-fields';
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

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
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
        password: new FormControl('', Validators.required),
        repeatPassword: new FormControl('', Validators.required),
      },
      [matchFields('password', 'repeatPassword', 'Passwords are not matching.')] // add validators to validate the form as a whole
    );
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
    console.log(this.firstName?.errors);
  }

  telephoneValidator(phoneExp: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any}|null => {
      const isValid = phoneExp ? phoneExp.test(control.value) : true;
      return !isValid ? {phoneNumber:  {value: control.value} } : null;
    }
  }

  get firstName(): AbstractControl|null {
    return this.formGroup.get('firstName');
  }

  get phoneNumber():  AbstractControl|null {
    return this.formGroup.get('phoneNumber');
  }

  get id():  AbstractControl|null {
    return this.formGroup.get('id');
  }

  get age():  AbstractControl|null {
    return this.formGroup.get('age');
  }

  get tc():  AbstractControl|null {
    return this.formGroup.get('tc');
  }

  get password():  AbstractControl|null {
    return this.formGroup.get('password');
  }

  get repeatPassword():  AbstractControl|null {
    return this.formGroup.get('repeatPassword');
  }
}
