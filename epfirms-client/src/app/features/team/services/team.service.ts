import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private _http: HttpClient) { }

  /** Returns the full record for a single team. */
  getOne(id: number) {
    return this._http.get(`/api/teams/${id}`);
  }

  /** Returns the records for all teams in the authorized user's firm. */
  getAll() {
    return this._http.get('/api/teams');
  }

  /** Returns the records for all teams where the given user is assigned. */
  getAllByUserId(userId: number | "me") {
    return this._http.get(`/api/user/${userId}/teams`);
  }

  /** Creates a new team within the current firm. */
  create(teamData: any) {
    return this._http.post('/api/teams', teamData);
  }

  /** 
   * Add a user to a team.
   * The user must be a member of the team or have firm admin privileges.
   * The user being added must be a member of the same firm as the team.
   */
  addUser(id: number, userId: number) {
    return this._http.post(`/api/teams/${id}/add-user`, { userId });
  }

  /**
   * Remove a user from a team.
   * The user must be a member of the team or have firm admin privileges.
   */

  removeUser(id: number, userId: number) {
    return this._http.delete(`/api/teams/${id}/remove-user/${userId}`);
  }

  getAllMembers(id: number): Observable<any> {
    return this._http.get(`/api/teams/${id}/members`);
  }

  updateMember(id: number, userId: number, data: any): Observable<any> {
    return this._http.put(`/api/teams/${id}/members/${userId}`, data);
  }
}
