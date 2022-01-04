import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatterBillingSettingsService {

  constructor(private http : HttpClient) { }

  create(data): Observable<any> {
    return this.http.post<any>("/api/matter-billing-settings", data);
  }
}
