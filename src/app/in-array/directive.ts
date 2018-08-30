import { Directive, Input, forwardRef, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { inArray } from './validator';

const IN_ARRAY_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => InValidator),
  multi: true
};

@Directive({
  selector: '[inArray][formControlName],[inArray][formControl],[inArray][ngModel]',
  providers: [IN_VALIDATOR]
})
export class InValidator implements Validator, OnInit, OnChanges {
  @Input() inArray: any;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = in_array(this.inArray);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'inArray') {
        this.validator = inArray(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    return this.validator(c);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
