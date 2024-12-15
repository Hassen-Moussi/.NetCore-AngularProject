import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ServiceService } from 'src/Components/UserComponents/UserService/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

constructor(private router : Router , private authService:ServiceService) {}

isLoggedIn: boolean = false;


  ngOnInit(): void {
 
    this.authService.getAuthStatus().subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
      
        const token = this.authService.getToken();
        if (token) {
          this.user = this.authService.getUserData(); 
        }
      } else {
        this.user = null; 
      }
    });

    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token && !this.isLoggedIn) {
      this.isLoggedIn = true;
      this.user = this.decodeToken(token); 
    }

    console.log("user info = ",this.user);
    
 
    
  }
user: any; 

  GoLogin(){
    this.router.navigate(['']);
  }

  logout(): void {

    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['/']);
  }

  decodeToken(token: string): any {

    const payload = JSON.parse(atob(token.split('.')[1])); 
    return payload;
  }
}
