import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../../../Models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private baseUrl = 'https://localhost:44368/api/User';
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  private userSubject = new BehaviorSubject<any>(this.getUserData());

  constructor(private http: HttpClient) {}


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
          this.userSubject.next(this.getUserData());
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
    this.userSubject.next(null); 
  }


  getUserData(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  }


  getAuthStatus(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }
  CreateUser(name:string,email:string,password:string): Observable<any> {
    const body ={name,email,password};
    return this.http.post(`${this.baseUrl}/signup`,body);
  }
  ModifyUser(id: number, name: string, email: string): Observable<any> {
    const params = new HttpParams()
      .set('id', id)
      .set('name', name)
      .set('email', email);
  
    return this.http.put(`${this.baseUrl}/Update`, {}, { params });
  }
}
