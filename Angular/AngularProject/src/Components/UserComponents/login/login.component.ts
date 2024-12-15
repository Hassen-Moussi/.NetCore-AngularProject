import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../UserService/service.service';
import { user } from '../../../Models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor (private service : ServiceService){}

  users?: user[];

  ngOnInit(): void {
    /*this.service.getUsers().subscribe(data => {
      this.users = data;
    });*/

    console.log("3asba");
    
    
  }


}
