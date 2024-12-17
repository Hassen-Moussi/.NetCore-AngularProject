import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gpstracking';
  showHeaderFooter: boolean = false;

  
  constructor(private router : Router) {}
  ngOnInit(): void {

   this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {

      this.showHeaderFooter = this.router.url !== '/';
    }
  });
  }


}
