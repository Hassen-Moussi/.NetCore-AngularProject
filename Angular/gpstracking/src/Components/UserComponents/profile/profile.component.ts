import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../UserService/service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private service :ServiceService , private router :Router , private snackBar: MatSnackBar){}
  user:any;
  name :string = '';
  email:string = '';
  password: string = '';
  id:any;
  editform : boolean = false ; 
  ngOnInit(): void {
    this.GetData()
  }

  GetData() {
    const response = this.service.getUserData();
    if (response) {
      this.user = response;
    } else {
      console.error('No user data available.');
    }

    if (this.user) {
      this.name = this.user.unique_name;
      this.email = this.user.email;
    }
    
  }

  edite(){

    this.editform = !this.editform ; 
  }

  modifyuserdata(): void {
    const updatedName = this.name.trim() === '' ? this.user.unique_name : this.name;
    const updatedEmail = this.email.trim() === '' ? this.user.email : this.email;

  if (
    updatedName === this.user.unique_name &&
    updatedEmail === this.user.email 
  ) {
    this.snackBar.open('No updates detected. Please make changes to update.', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-warning'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    return;
  }

    this.service.ModifyUser(this.user.UserId, updatedName, updatedEmail).subscribe({
      next: (response) => {
        this.snackBar.open('Updated successful!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'center',  
          verticalPosition: 'top' 
        
        });
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        this.user = null;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error updating user:', err);
      }
    });
  }
  
  
  

}
