import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseTemplateCommunityService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    return this.http.get(`/api/community-templates/${id}`);
  }

  get(): Observable<any> {
    return this.http.get('/api/community-templates');
  }

  saveToFirmTemplates(templateId: number): Observable<any> {
    return this.http.post('/api/community-templates/save', {id: templateId});
  }

  create(caseTemplateId: number):Observable<any> {
    return this.http.post('/api/community-templates', {case_template_id: caseTemplateId});
  }

  delete(id):Observable<any>{
    return this.http.delete(`/api/community-templates/${id}`);
  }

  update(templateId: number, data):Observable<any> {
    return this.http.put(`/api/community-templates/${templateId}`, data);
  }

  createTask(templateId: number, data):Observable<any> {
    return this.http.post(`/api/community-templates/${templateId}/task`, data);
  }

  updateTask(taskId: number, data):Observable<any> {
    return this.http.put(`/api/community-templates/task/${taskId}`, data);
  }

  deleteTask(taskId: number):Observable<any> {
    return this.http.delete(`/api/community-templates/task/${taskId}`);
  }

  getTaskFileUploadURL(fileName: string, contentType: string):Observable<any> {
    return this.http.get(`/api/community-templates/task/file/upload`, {
      params: {
        name: fileName,
        MIME: contentType
      }
    });
  }

  getTaskFileDownloadURL(key: string):Observable<any> {
    return this.http.get(`/api/community-templates/task/file/download`, {
      params: {
        key: encodeURIComponent(key) 
      }
    });
  }

  createTaskFile(taskId: number, data):Observable<any> {
    return this.http.post(`/api/community-templates/task/${taskId}/file`, data);
  }

  updateTaskFile(fileId: number, data):Observable<any> {
    return this.http.put(`/api/community-templates/task/file/${fileId}`, data);
  }

  deleteTaskFile(fileId: number):Observable<any> {
    return this.http.delete(`/api/community-templates/task/file/${fileId}`);
  }
}
