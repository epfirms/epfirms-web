import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthActions } from '@app/features/auth/auth.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err);
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.store.dispatch(AuthActions.signOut());
            }
            
            const error = err.error ? err.error.message : err.statusText;
            return throwError(error);
        }))
    }
}