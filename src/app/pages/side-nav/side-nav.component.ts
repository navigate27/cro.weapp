import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/utils/routes';
import { STORAGE_KEYS } from 'src/app/utils/storage-keys';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  userData: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private storage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userData = this.storage.get(STORAGE_KEYS.USER_DATA);
    console.log('ADA');
    if (!this.userData) {
      this.storage.clear();
      this.router.navigate([ROUTES.LOGIN]);
      location.reload();
    }
  }

  logout() {
    this.storage.clear();
    this.router.navigate([ROUTES.LOGIN]);
    location.reload();
  }
}
