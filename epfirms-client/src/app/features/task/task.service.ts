import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { addTask, deleteTask, updateTask } from './task.actions';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private _http: HttpClient, private store: Store) {}

  getOne(taskId: number): Observable<any> {
    return this._http.get(`/api/tasks/${taskId}`);
  }

  /**
   * Returns a filtered list of tasks. Filter defaults to the current
   * user as assignee if no filters are passed
   */
  getAll(filters: { assignee_id?: number } = {}): Observable<Task[]> {
    const filterParams = new HttpParams({ fromObject: { ...filters } });
    return this._http.get<Task[]>('/api/tasks', { params: filterParams });
  }

  create(data: any): Observable<any> {
    return this._http.post<Task>('/api/tasks', { data }).pipe(
      map((task) => this.store.dispatch(addTask({task})))
    );
  }

  update(id: number, data: any): Observable<any> {
    return this._http.put<Task>(`/api/tasks/${id}`, { data }).pipe(
      map((task) => this.store.dispatch(updateTask({task: {id: task.id, changes: task}})))
    );
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`/api/tasks/${id}`).pipe(
      map(() => this.store.dispatch(deleteTask({id: id.toString()})))
    );
  }
}
