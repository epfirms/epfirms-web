import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matter } from './matter.model';

@Injectable({
  providedIn: 'root'
})
export class MatterService {

  constructor(private http: HttpClient) { }

  add(): Observable<any> {
    return this.http.post('', {});
  }

  delete() {}

  update() {}

  getOne() {}

  getAll(): Observable<Matter[]> {
    return this.http.get<Matter[]>('/api/matters');
  }
}
