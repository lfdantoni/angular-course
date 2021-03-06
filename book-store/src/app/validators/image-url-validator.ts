import { FormControl } from '@angular/forms';

const imageUrlValidator = (control: FormControl): {[key: string]: any} => {
    const value = control.value ? control.value as string : '';

    const isValid = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(value);

    return !isValid ? {imageUrlInvalid: {value}} : null;
};

export {imageUrlValidator};
