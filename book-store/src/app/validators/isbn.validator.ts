import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator — a function that returns a ValidatorFn.
// ValidatorFn receives the FormControl and returns null (valid) or an error object.
export function isbnValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value as string) ?? '';

    // Skip validation when field is empty (let Validators.required handle that separately)
    if (!value) return null;

    // Accept ISBN-10 (10 digits) or ISBN-13 (13 digits), optionally hyphen-separated
    const clean = value.replace(/-/g, '');
    const valid = /^\d{10}$/.test(clean) || /^\d{13}$/.test(clean);

    return valid ? null : { isbn: { value: control.value } };
  };
}
