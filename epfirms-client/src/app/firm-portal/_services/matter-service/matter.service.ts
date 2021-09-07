import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Matter } from '@app/_models/matter';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { concatMap, filter, map, reduce, take } from 'rxjs/operators';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class MatterService extends EntityCollectionServiceBase<Matter> {
  constructor(
    private _http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _currentUserService: CurrentUserService
  ) {
    super('Matter', serviceElementsFactory);
  }

  get(): Observable<any> {
    return this._http.get<any>('/api/matters');
  }

  create(matter): Observable<any> {
    return this._http
      .post<any>('/api/matters', { matter })
      .pipe(
        map((response: Matter) => {
          this.addOneToCache(response);
          return of(response);
        })
      );
  }

  delete(id): Observable<any> {
    return this._http.delete<any>('/api/matters');
  }

  update(matter): Observable<any> {
    return this._http
      .put<any>('/api/matters', matter)
      .pipe(
        map((response: Matter) => {
          this.updateOneInCache(response);
          return of(response);
        })
      );
  }

  getClientMatters(userId: number) {
    return this.entities$.pipe(
      take(1),
      map((matters: Matter[]) => {
        const clientMatters = matters.filter(matter => matter.client_id === userId || matter.spouse_id === userId);
        return clientMatters;
      })
    )
  }

    /*
    addMatterNote()
      Inputs:
        note: A note object containing
          user_id: The id of the user making the comment.
          matter_id: The id of the matter (case, lead, etc), that the comment is related to.
          note_string: The actual content of the comment, in the form of a String.

      Outputs:
        Post request to the backend that sends the note object to be added to the database.
  */
        addMatterNote(note): Observable<any> {
          console.log("I'm the one doing the sending!");
          return this._http.post<any>('/api/matters/note', note).pipe(
            map((response: Matter) => {
              this.updateOneInCache(response);
              return of(response);
            })
          );
        }

  addMatterTask(task): Observable<any> {
    return this._http
      .post<any>('/api/matters/task', task)
      .pipe(
        map((response: Matter) => {
          this.updateOneInCache(response);
          return of(response);
        })
      );
  }

  updateMatterTask(task): Observable<any> {
    return this._http
      .patch<any>('/api/matters/task', task)
      .pipe(
        map((response: Matter) => {
          this.updateOneInCache(response);
          return of(response);
        })
      );
  }

  deleteMatterTask(task): Observable<any> {
    return this._http
      .delete<any>('/api/matters/task', {
        body: { id: task },
      })
      .pipe(
        map((response: Matter) => {
          this.updateOneInCache(response);
          return of(response);
        })
      );
  }

  getAssignedMatterTasks(): Observable<any> {
    return this._currentUserService.getCurrentUser().pipe(
      take(1),
      concatMap(({ user }) => {
        return this.entities$.pipe(
          map((matters: Matter[]) => {
            return matters.reduce((acc, matter) => {
              const filteredMatterTasks = matter.matter_tasks.reduce(
                (acc, task) => {
                  if (task.assignee_id === user.id) {
                    acc.push({
                      task,
                      legal_area: matter.legal_area,
                      client: matter.client,
                      matterId: matter.id,
                    });
                  }
                  return acc;
                },
                []
              );
              return [...acc, ...filteredMatterTasks];
            }, []);
          })
        );
      })
    );
  }

  createIntake(matterId: number): Observable<any> {
    return this._http
      .post<any>('/api/matters/intake', { matter_id: matterId })
      .pipe(
        map((response: Matter) => {
          this.updateOneInCache(response);
          return of(response);
        })
      );
  }
}
