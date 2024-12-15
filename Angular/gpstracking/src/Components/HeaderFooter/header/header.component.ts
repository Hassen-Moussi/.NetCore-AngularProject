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
    this.authService.getAuthStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
    this.user = this.authService.getUserData();
 
    
  }
user: any; 

  GoLogin(){
    this.router.navigate(['']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);  
  }
}
