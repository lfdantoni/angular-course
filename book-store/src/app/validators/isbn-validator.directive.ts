import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { isbnValidator } from './isbn.validator';

// Custom validator directive — the TDF equivalent of the ValidatorFn used in Reactive Forms.
// Applied as an attribute: <input isbnValidatorDirective ...>
// Registered via NG_VALIDATORS so Angular's form infrastructure picks it up automatically.
@Directive({
  selector: '[isbnValidatorDirective]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IsbnValidatorDirective,
      multi: true, // multi: true because multiple validators can be registered on one control
    },
  ],
})
export class IsbnValidatorDirective implements Validator {
  // Reuses the same ValidatorFn from the Reactive Form — no logic duplication
  validate(control: AbstractControl): ValidationErrors | null {
    return isbnValidator()(control);
  }
}
