import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarHidden : boolean = false;
  nonFixed : boolean = true;
  currentClasses: {};

  constructor(private cookieProvider: CookieService, private router: Router) {}

  ngOnInit() {
    this.setCurrentClasses();
  }

  logout(){
    this.cookieProvider.delete("Authorization");
    this.router.navigate(["/sign"]);
  }

  mouse(value){
    this.navbarHidden = value;
    this.setCurrentClasses();
  }

  setCurrentClasses(){
    this.currentClasses =  {
      'navbar-hidden': ( this.navbarHidden && !this.nonFixed ),
      'nav-button-non-fixed' : this.nonFixed
    };
  }
}
