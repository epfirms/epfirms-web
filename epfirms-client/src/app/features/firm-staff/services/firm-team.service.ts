import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirmTeamService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('/api/firm/team');
  }

  create(employeeId: number): Observable<any> {
    return this.http.post('/api/firm/team', {employeeId});
  }

  addMember(teamId: number, employeeId: number, roleId: number): Observable<any> {
    return this.http.post('/api/firm/team/members', {
      teamId,
      employeeId,
      roleId
    });
  }

  getMembersByTeam(teamId: number): Observable<any> {
    return this.http.get(`/api/firm/team/${teamId}/members`);
  }

  getTeamsByOwner(ownerId: number): Observable<any> {
    return this.http.get(`/api/firm/team/owner/${ownerId}`);
  }
}
