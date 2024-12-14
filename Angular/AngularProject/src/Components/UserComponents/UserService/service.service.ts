import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../../../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private  baseUrl = 'https://localhost:44368/api/User';

  constructor(private http : HttpClient) { }


  getUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.baseUrl);
}
}
