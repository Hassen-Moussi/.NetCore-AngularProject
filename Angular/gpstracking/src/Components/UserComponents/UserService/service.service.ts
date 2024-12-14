import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../../../Models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {jwtDecode}  from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private  baseUrl = 'https://localhost:44368/api/User';
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http : HttpClient) { }


  getUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.baseUrl);
}

login(email: string, password: string): Observable<any> {
  const body = { Email: email, Password: password };
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post(`${this.baseUrl}/login`, body, { headers }).pipe(
    tap((response: any) => {
      if (response && response.token) {
        this.storeToken(response.token);
        this.authSubject.next(true);  
      }
    })
  );
}

storeToken(token: string): void {
  localStorage.setItem('authToken', token);
}

getToken(): string | null {
  return localStorage.getItem('authToken');
}

isAuthenticated(): boolean {
  return !!this.getToken();
}

logout(): void {
  localStorage.removeItem('authToken');
  this.authSubject.next(false); 
}

getUserData(): any {
  const token = this.getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }
  return null;
}

getAuthStatus(): Observable<boolean> {
  return this.authSubject.asObservable();
}

}

