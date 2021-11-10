import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateTaskService {

  constructor(private http: HttpClient) { }

  create(templateId: number, data):Observable<any> {
    return this.http.post(`/api/firm/task-templates/${templateId}/task`, data);
  }

  update(taskId: number, data):Observable<any> {
    return this.http.put(`/api/firm/task-templates/task/${taskId}`, data);
  }

  delete(taskId: number):Observable<any> {
    return this.http.delete(`/api/firm/task-templates/task/${taskId}`);
  }
}
