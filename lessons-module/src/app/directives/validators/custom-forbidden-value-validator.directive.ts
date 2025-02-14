import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { forbiddenValueValidator } from '../../validators/forbidden-value-validator';

@Directive({
  selector: '[appForbiddenValue]',
  standalone: false,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomForbiddenValueValidatorDirective,
      multi: true
    }
  ]
})
export class CustomForbiddenValueValidatorDirective {
  @Input('appForbiddenValue') forbiddenName = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName
      ? forbiddenValueValidator(new RegExp(this.forbiddenName, 'i'))(control)
      : null;
  }
}
