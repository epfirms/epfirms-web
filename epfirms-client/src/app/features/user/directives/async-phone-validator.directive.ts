import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { delay, map, Observable, of, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';

export class PhoneValidator {
  static createValidator(userService: UserService, phoneNumberType: 'FIXED_LINE' | 'MOBILE' | 'FIXED_LINE_OR_MOBILE' = 'FIXED_LINE_OR_MOBILE'): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (!control.value) {
        return of(null);
      }
      return of(control.value).pipe(
        delay(250),
        switchMap((value) =>
          userService.checkPhoneNumber(value).pipe(map((x) => (x.data.valid && (x.data.type === phoneNumberType || x.data.type === 'FIXED_LINE_OR_MOBILE') ? null : x.data))),
        ),
      );
    };
  }
}
