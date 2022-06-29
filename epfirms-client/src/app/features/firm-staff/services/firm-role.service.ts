import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirmRoleService {
  get(): Observable<any> {
    return of([
      'attorney',
      'associate attorney',
      'paralegal',
      'legal assistant',
      'receptionist',
      'office manager',
      'other',
    ]);
  }
}
