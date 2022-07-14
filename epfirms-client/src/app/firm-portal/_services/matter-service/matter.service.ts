import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Matter } from '@app/features/matter/matter.model';
import { concatMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngneat/hot-toast';
import { selectDenormalizedMatters } from '@app/features/matter/matter.selectors';
import { AuthService } from '@app/features/auth/auth.service';
import { SocketService } from '@app/features/socket/socket.service';
import { addMatter, deleteMatter, updateMatter } from '@app/features/matter/matter.actions';

@Injectable({
  providedIn: 'root',
})
export class MatterService {
  constructor(
    private _http: HttpClient,
    private _socketService: SocketService,
    private _toastService: HotToastService,
    private store: Store,
    private authService: AuthService
  ) {

    // Socket event listeners for syncing changes across firm users
    this._socketService.on('add:matter', (entityData) => {
      this.store.dispatch(addMatter({matter: entityData}));
    });

    this._socketService.on('update:matter', (entityData) => {
      this.store.dispatch(updateMatter({matter: {id: entityData.id, changes: entityData}}));
    });

    this._socketService.on('delete:matter', (entityData) => {
      this.store.dispatch(deleteMatter({id: entityData.id}));
    });
  }

  get(): Observable<any> {
    return this._http.get<any>('/api/matters');
  }

  getById(id: number):Observable<any> {
    return this._http.get<any>(`/api/matters/${id}`);
  }

  create(matter): Observable<any> {
    return this._http.post<any>('/api/matters', { matter }).pipe(
      this._toastService.observe({
        loading: `Adding ${matter.matter_type || 'matter'}...`,
        success: () => 'Successfully added!',
        error: () => 'An error occurred. Unable to add matter.',
      }),
      map((response: Matter) => {
        this.store.dispatch(addMatter({matter: response}));
        this._socketService.addOneToCacheSync('matter', response);
        return of(response);
      })
    );
  }

  delete(id): Observable<any> {
    return this._http.delete<any>('/api/matters');
  }

  update(matter): Observable<any> {
    return this._http.put<any>('/api/matters', matter).pipe(
      map((response: Matter) => {
        this.store.dispatch(updateMatter({matter: {id: response.id, changes: response}}));
        this._socketService.updateCacheSync('matter', response);
        return of(response);
      })
    );
  }

  getClientMatters(userId: number) {
    return of([]);
    // return this.entities$.pipe(
    //   take(1),
    //   map((matters: Matter[]) => {
    //     const clientMatters = matters.filter(
    //       (matter) => matter.client_id === userId || matter.spouse_id === userId
    //     );
    //     return clientMatters;
    //   })
    // );
  }

  getNotes(matterId: number): Observable<any> {
    return this._http.get<any>(`/api/matters/${matterId}/notes`);
  }

  addMatterNote(matterId: number, note): Observable<any> {
    return this._http.post<any>(`/api/matters/${matterId}/notes`, {content: note});
  }

  deleteNote(id: number): Observable<any> {
    return this._http.delete<any>(`/api/matters/notes/${id}`);
  }

  addMatterTask(task): Observable<any> {
    return this._http.post<any>('/api/matters/task', task).pipe(
      map((response: Matter) => {
        this.store.dispatch(updateMatter({matter: {id: response.id, changes: response}}));
        this._socketService.updateCacheSync('matter', response);
        return response;
      })
    );
  }

  updateMatterTask(task): Observable<any> {
    return this._http.patch<any>('/api/matters/task', task).pipe(
      map((response: Matter) => {
        this.store.dispatch(updateMatter({matter: {id: response.id, changes: response}}));
        this._socketService.updateCacheSync('matter', response);
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
          this.store.dispatch(updateMatter({matter: {id: response.id, changes: response}}));
          this._socketService.updateCacheSync('matter', response);
          return of(response);
        })
      );
  }

  getAssignedMatterTasks(): Observable<any> {
    return this.authService.idTokenResult$.pipe(
      take(1),
      concatMap(( token ) => {
        return this.store.select(selectDenormalizedMatters).pipe(
          map((matters: Matter[]) => {
            return matters.reduce((acc, matter) => {
              const filteredMatterTasks = matter.matter_tasks.reduce(
                (a, task) => {
                  if (task.assignee_id === token.claims.id && matter.status === 'active') {
                    a.push({
                      task,
                      legal_area: matter.legal_area,
                      client: matter.client,
                      matterId: matter.id,
                      matter: matter
                    });
                  }
                  return a;
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
          this.store.dispatch(updateMatter({matter: {id: response.id, changes: response}}));
          this._socketService.updateCacheSync('matter', response);
          return of(response);
        })
      );
  }

  createBillOrPayment(bill): Observable<any> {
    return this._http.post<any>('/api/billing', bill);
  }

  editMatterBillOrPayment(bill): Observable<any> {
    return this._http.put<any>('/api/billing', bill)
  }

  getMatterBillingById(id: number): Observable<any> {
    return this._http.get<any>(`/api/billing/${id}`);
  }

  removeMatterBill(id): Observable<any> {
    return this._http.delete<any>(`/api/billing/${id}`);
  }
}
