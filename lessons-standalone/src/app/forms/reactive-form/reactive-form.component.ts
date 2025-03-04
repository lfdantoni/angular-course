import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { countries } from '../../mock-data/countries';
import { idValidator } from '../../validators/id-validator';
import { matchFields } from '../../validators/match-fields';
import { CustomForbiddenValueValidatorDirective } from '../../directives/validators/custom-forbidden-value-validator.directive';
import { CustomForbiddenValueValidatorAsyncDirective } from '../../directives/validators/custom-forbidden-value-validator-async.directive';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  imports: [
    ReactiveFormsModule,
    CustomForbiddenValueValidatorDirective,
    CustomForbiddenValueValidatorAsyncDirective,
    JsonPipe
  ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
})
export class ReactiveFormComponent {
  formGroup: FormGroup;
  countries = countries;

  constructor() {
    this.formGroup = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        lastName: new FormControl('', Validators.required), // array is not necessary for one validator
        email: new FormControl('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl(
          '',
          this.telephoneValidator(
            /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
          )
        ),
        id: new FormControl('', idValidator),
        comment: new FormControl({ value: 'comment text', disabled: false }),
        country: new FormControl('', Validators.required),
        age: new FormControl(0, [Validators.required, Validators.min(18)]),
        gender: new FormControl('', Validators.required),
        tc: new FormControl(false, [Validators.requiredTrue]),
        password: new FormControl('', Validators.required),
        repeatPassword: new FormControl('', Validators.required),
        customValidator: new FormControl(''),
        customValidatorAsync: new FormControl(''),
        asyncValidatorFnField: new FormControl('', null, this.asyncValidatorFn), // async validators are the third parameter
      },
      [matchFields('password', 'repeatPassword', 'Passwords are not matching.')] // add validators to validate the form as a whole
    );
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
    console.log(this.firstName?.errors);
  }

  asyncValidatorFn(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = control.value != '123';
        resolve(!isValid ? {asyncValidatorFn: true} : null);
      }, 3000);
    });
  }

  telephoneValidator(phoneExp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = phoneExp ? phoneExp.test(control.value) : true;
      return !isValid ? { phoneNumber: { value: control.value } } : null;
    };
  }

  get firstName(): AbstractControl | null {
    return this.formGroup.get('firstName');
  }

  get phoneNumber(): AbstractControl | null {
    return this.formGroup.get('phoneNumber');
  }

  get id(): AbstractControl | null {
    return this.formGroup.get('id');
  }

  get age(): AbstractControl | null {
    return this.formGroup.get('age');
  }

  get tc(): AbstractControl | null {
    return this.formGroup.get('tc');
  }

  get password(): AbstractControl | null {
    return this.formGroup.get('password');
  }

  get repeatPassword(): AbstractControl | null {
    return this.formGroup.get('repeatPassword');
  }

  get customValidator(): AbstractControl | null {
    return this.formGroup.get('customValidator');
  }

  get customValidatorAsync(): AbstractControl | null {
    return this.formGroup.get('customValidatorAsync');
  }

  get asyncValidatorFnField(): AbstractControl | null {
    return this.formGroup.get('asyncValidatorFnField');
  }
}
