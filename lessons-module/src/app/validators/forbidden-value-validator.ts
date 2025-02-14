import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const forbiddenValueValidator = (nameRe: RegExp): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenValue: { value: control.value } } : null;
  };
}
