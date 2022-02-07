import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatterTaskService {
  constructor(private _http: HttpClient) {}

  /**
   * Returns a filtered list of tasks. Filter defaults to the current
   * user as assignee if no filters are passed
   */
  getTaskList(filters: { assignee_id?: number } = {}): Observable<any> {
    const filterParams = new HttpParams({ fromObject: { ...filters } });
    return this._http.get('/api/tasks', { params: filterParams });
  }

  create(task: any): Observable<any> {
    return this._http.post('/api/task', { task });
  }
}
