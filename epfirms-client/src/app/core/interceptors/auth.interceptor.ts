import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { mergeMap, Observable } from 'rxjs';
import { AuthService } from '@app/features/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.idToken$.pipe(mergeMap(token => {
            if (!request.url.includes("s3.us-east-2.amazonaws.com")) {
                if (token) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }
            }
            return next.handle(request);
        }));
    }
}
