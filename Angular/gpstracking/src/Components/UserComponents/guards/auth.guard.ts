import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route : Router) {}
  canActivate(): boolean {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      this.route.navigate(['/home']); 
      return false; 
    }
    return true; 
  }
  
}
