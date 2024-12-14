import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../UserService/service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private service : ServiceService , private router :Router ,  private snackBar: MatSnackBar){}

  Email = '';
  Password = '';


  ngOnInit(): void {

 
  }

  Login(): void {

    this.service.login(this.Email, this.Password).subscribe(
      (response) => {
        if (response && response.token) {
          this.service.storeToken(response.token);
        
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          
          });
          this.router.navigate(['']);
        }
      },
      (error) => {
        this.snackBar.open('Login failed! Please check your credentials.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'center',  // Centers horizontally
          verticalPosition: 'top' 
        });
      }
    );
  }


}
