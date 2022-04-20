import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BugReportService {

  constructor(private http : HttpClient) { }

  // sends a issue to the server that will be sent to GitHub Issues
  createGHIssue(issue) : Observable<any> {
    return this.http.post('/api/github/issue', issue);
  }



}
