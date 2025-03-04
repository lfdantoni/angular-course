import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { forbiddenValueValidator } from '../../validators/forbidden-value-validator';

@Directive({
  selector: '[appForbiddenValueAsync]',
  standalone: false,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS, // pay attention to the difference between NG_VALIDATORS and NG_ASYNC_VALIDATORS
      useExisting: CustomForbiddenValueValidatorAsyncDirective,
      multi: true,
    },
  ],
})
export class CustomForbiddenValueValidatorAsyncDirective {
  @Input('appForbiddenValueAsync') forbiddenName = '';

  // this method should follow the AsyncValidatorFn interface
  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.forbiddenName
            ? forbiddenValueValidator(new RegExp(this.forbiddenName, 'i'))(
                control
              )
            : null
        );
      }, 3000);
    });
  }
}
