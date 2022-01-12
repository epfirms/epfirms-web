import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseTemplateService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get('/api/firm/case-templates');
  }

  create(data):Observable<any> {
    return this.http.post('/api/firm/case-templates', data);
  }

  delete(id):Observable<any>{
    return this.http.delete(`/api/firm/case-templates/${id}`);
  }

  update(templateId: number, data):Observable<any> {
    return this.http.put(`/api/firm/case-templates/${templateId}`, data);
  }

  createTask(templateId: number, data):Observable<any> {
    return this.http.post(`/api/firm/case-templates/${templateId}/task`, data);
  }

  updateTask(taskId: number, data):Observable<any> {
    return this.http.put(`/api/firm/case-templates/task/${taskId}`, data);
  }

  deleteTask(taskId: number):Observable<any> {
    return this.http.delete(`/api/firm/case-templates/task/${taskId}`);
  }

  getTaskFileUploadURL(fileName: string, contentType: string):Observable<any> {
    return this.http.get(`/api/firm/case-templates/task/file/upload`, {
      params: {
        name: fileName,
        MIME: contentType
      }
    });
  }

  getTaskFileDownloadURL(key: string):Observable<any> {
    return this.http.get(`/api/firm/case-templates/task/file/download`, {
      params: {
        key: encodeURIComponent(key) 
      }
    });
  }

  createTaskFile(taskId: number, data):Observable<any> {
    return this.http.post(`/api/firm/case-templates/task/${taskId}/file`, data);
  }

  updateTaskFile(fileId: number, data):Observable<any> {
    return this.http.put(`/api/firm/case-templates/task/file/${fileId}`, data);
  }

  deleteTaskFile(fileId: number):Observable<any> {
    return this.http.delete(`/api/firm/case-templates/task/file/${fileId}`);
  }
}
