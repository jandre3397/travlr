import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isAuthAPI: boolean = false;

    // Determine if the request is for login or registration endpoints
    if (request.url.includes('/login') || request.url.includes('/register')) {
      isAuthAPI = true;
    }

    // If the user is logged in and this is NOT an auth API call, inject the token
    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      const token = this.authenticationService.getToken();
      
      if (token) {
        const authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}` // Inject JWT into headers
          }
        });
        return next.handle(authReq);
      }
    }

    return next.handle(request);
  }
}

// Export provider to inject into the app module
export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
