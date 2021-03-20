import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Emitters } from 'src/app/emitters/emitters';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ROUTES } from 'src/app/utils/routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class AppNavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: any;
  name: string = '';
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.isLoggedIn = auth;
      if (this.isLoggedIn) {
        this.user = this.auth.user();
        this.name = `${this.user.firstname} ${this.user.lastname}`;
      }
      console.log(this.isLoggedIn);
    });
    if (this.auth.isAuthenticated()) {
      this.isLoggedIn = true;
      this.user = this.auth.user();
      this.name = `${this.user.firstname} ${this.user.lastname}`;
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.auth.logout();
    this.router.navigate([ROUTES.LOGIN]);
  }
}
