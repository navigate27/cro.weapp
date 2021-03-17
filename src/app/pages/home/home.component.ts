import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { STORAGE_KEYS } from 'src/app/utils/storage-keys';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = true;
  userData: any;
  constructor(private storage: LocalStorageService) {}

  ngOnInit(): void {
    this.userData = this.storage.get(STORAGE_KEYS.USER_DATA);
    // console.log(this.userData);
    this.isLoggedIn = false;
    if (this.userData) {
      this.isLoggedIn = true;
    }
  }
}
