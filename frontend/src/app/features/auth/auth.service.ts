import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{
      name(access_token: string, name: any): unknown; access_token: string; user: any 
}>(
      `${this.apiUrl}/auth/login`,
      { email, password }
    ).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  register(email: string, password: string) {
    return this.http.post<{ access_token: string; user: any }>(
      `${this.apiUrl}/auth/signup`,
      { email, password }
    );
  }

  saveToken(token: string,email: string) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('name', email);
  }

  getToken(): string | null {
     return localStorage.getItem('access_token');
  }
isLoggedIn(): boolean {
  return !!localStorage.getItem('access_token');
}

logout(): void{
  localStorage.removeItem('access_token');
}

}
