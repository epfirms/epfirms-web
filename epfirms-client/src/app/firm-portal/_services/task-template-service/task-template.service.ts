import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskTemplateService {

  constructor(private http: HttpClient) { }

  create(data):Observable<any> {
    return this.http.post('/api/task-template', data);
  }
}
