import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!request.url.includes("s3.us-east-2.amazonaws.com")){
        const accessToken = this._authService.accessTokenValue;
        if (accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }
      }
        return next.handle(request);
    }
}
