import { AbstractControl } from '@angular/forms';

const idValidator = (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value ? control.value as string : '';
    const isValid = value.toLowerCase().startsWith('id');
    return !isValid ? {idInvalid: {value}} : null;
};

export {idValidator};
