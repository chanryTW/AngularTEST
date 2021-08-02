import { Directive, Input } from '@angular/core';
import {
	AbstractControl,
	NG_VALIDATORS,
	Validator,
	ValidatorFn,
	Validators,
} from '@angular/forms';

@Directive({
	selector: '[appMinlength]',
})
export class MinlengthDirective {}
