import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  constructor(private http : HttpClient) { }

  create(data): Observable<any> {
    return this.http.post<any>("/api/statement", data);
  }

  getAllByMatterId(id): Observable<any>{
    return this.http.get<any>(`/api/statement/${id}`);
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(`/api/statement/${id}`);
  }

  update(data): Observable<any> {
    return this.http.put<any>("/api/statement/", data);
  }

  download(statementId) : Observable<any> {
    return this.http.get(`/api/statement/download/${statementId}`, {responseType: 'text'});
  }
}
