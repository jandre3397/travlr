import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptProvider } from './utils/jwt.interceptor'; // Updated import path

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule), // Ensure HTTP Client is properly set up
    authInterceptProvider // Register the JWT Interceptor
  ]
};
