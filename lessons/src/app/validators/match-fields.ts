import { ValidatorFn, FormGroup, AbstractControl } from '@angular/forms';

/**
 *
 * @param firstField
 * @param secondField
 * @param errorMessage error message to show, formGroup.errors -> {matchFields: errorMessage}
 */
const matchFields = (firstField: string, secondField: string, errorMessage: string): ValidatorFn => {

  return (control: AbstractControl): {[key: string]: any}|null => {
    console.log('matchFields',control)

    const firstFieldControl = control.get(firstField);
    const secondFieldControl = control.get(secondField);

    const isValid = firstFieldControl?.value === secondFieldControl?.value;

    return !isValid ?
      {
        matchFields: errorMessage,
        firstField,
        secondField
      } : null;
  };
};

export {matchFields};
