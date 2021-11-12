import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskTemplateService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get('/api/firm/task-templates');
  }

  create(data):Observable<any> {
    return this.http.post('/api/firm/task-templates', data);
  }

  delete(id):Observable<any>{
    return this.http.delete(`/api/firm/task-templates/${id}`);
  }

  update(templateId: number, data):Observable<any> {
    return this.http.put(`/api/firm/task-templates/${templateId}`, data);
  }
}
