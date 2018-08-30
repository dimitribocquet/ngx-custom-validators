import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isPresent } from '../util/lang';

export const inArray = (array: any[]): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors => {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: any = control.value;

    return array.includes(v) ? null : { inArray: true, reason: array };
  };
};
