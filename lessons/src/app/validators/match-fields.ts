import { ValidatorFn, FormGroup } from '@angular/forms';

/**
 *
 * @param firstField
 * @param secondField
 * @param errorMessage error message to show, formGroup.errors -> {matchFields: errorMessage}
 */
const matchFields = (firstField: string, secondField: string, errorMessage: string): ValidatorFn => {

  return (formGroup: FormGroup): {[key: string]: any} => {
    const isValid = formGroup.controls[firstField].value === formGroup.controls[secondField].value;

    return !isValid ?
      {
        matchFields: errorMessage,
        firstField,
        secondField
      } : null;
  };
};

export {matchFields};
