import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatterTaskService {

  constructor(
    private _http: HttpClient
  ) { }

  create(task: any): Observable<any> {
    return this._http.post('/api/task', { task });
  }
}
