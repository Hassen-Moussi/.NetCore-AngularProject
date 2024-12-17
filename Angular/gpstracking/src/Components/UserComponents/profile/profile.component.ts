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
  userid:any;
  user:any;
  name :string = '';
  email:string = '';
  password: string = '';
  id:any;
  editform : boolean = false ; 
  originalUser:any;
  ngOnInit(): void {
    this.GetData()
    this.getuserbyid(this.userid);

    this.service.user$.subscribe((fetchedUser) => {
      this.user = fetchedUser;
      this.originalUser = { ...fetchedUser };
    });
    
  }

  GetData() {
    const response = this.service.getUserData();
    if (response) {
      this.userid = response.UserId;
   
      
    } else {
      console.error('No user data available.');
    }
    
  }

  getuserbyid(id :number) {
    this.service.GetByid(id).subscribe(
      (response)=>{
        if (response) {
          this.user = response;
          console.log("user info form profile ",response);
          
        } else {
          console.error('No user data available.');
        }
      }
    )
  }

  edite(){

    this.editform = !this.editform ; 
    this.getuserbyid(this.userid);
  }

  modifyuserdata(): void {
    const updatedName = this.user.name.trim(); // Use the user object directly
    const updatedEmail = this.user.email.trim();
  
    if (
      updatedName === this.originalUser.name &&
      updatedEmail === this.originalUser.email 
    ) {
      this.snackBar.open('No updates detected. Please make changes to update.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-warning'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }
    if (updatedEmail !== this.originalUser.email) {
      this.service.ModifyUser(this.user.id, updatedName, updatedEmail).subscribe({
        next: (response) => {
          this.snackBar.open('Update successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center',  
            verticalPosition: 'top' 
          });
        }
        }),
       
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      this.user = null;
      this.router.navigate(['/']);
    }
  
    this.service.ModifyUser(this.user.id, updatedName, updatedEmail).subscribe({
      next: (response) => {
        this.snackBar.open('Update successful!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'center',  
          verticalPosition: 'top' 
        });

        this.user.name = updatedName;
        this.user.email = updatedEmail;
  
        this.service.updateUser(this.user);

       
      },
      error: (err) => {
        console.error('Error updating user:', err);
      }
    });
  }
  
  
  
  

}
