import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateTaskService {

  constructor(private http: HttpClient) { }

  create(data):Observable<any> {
    return this.http.post('/api/template-task', data);
  }

  update(data):Observable<any> {
    return this.http.put('/api/template-task', data);
  }
}
