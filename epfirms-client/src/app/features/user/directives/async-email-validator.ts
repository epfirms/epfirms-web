import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { delay, map, Observable, of, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';

export class EmailValidator {
  static createValidator(userService: UserService, initialValue?: string): AsyncValidatorFn {    
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (!control.value) {
        return of(null);
      }
      return of(control.value).pipe(
        delay(250),
        switchMap((value) =>
          userService.validateEmail(value).pipe(map((x) => (x.data.valid || (initialValue && initialValue.length && control.value === initialValue) ? null : x.data))),
        ),
      );
    };
  }
}
