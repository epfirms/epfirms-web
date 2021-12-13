import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { StaffService } from '@app/firm-portal/_services/staff-service/staff.service';

@Injectable({providedIn: 'root'})
export class StaffResolver implements Resolve<any> {

  constructor(private _staffService: StaffService) { }

  resolve(): Observable<any> | Observable<never> {
    return this._staffService.getStaff()
      .pipe(
        take(1),
        catchError(err => {
          console.error('Error fetching staff members ', err);
          return EMPTY;
        }),
      );
  }
}
