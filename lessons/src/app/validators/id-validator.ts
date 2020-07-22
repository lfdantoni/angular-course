import { FormControl } from '@angular/forms';

const idValidator = (control: FormControl): {[key: string]: any} => {
    const value = control.value ? control.value as string : '';
    const isValid = value.toLowerCase().startsWith('id');
    return !isValid ? {idInvalid: {value}} : null;
};

export {idValidator};
