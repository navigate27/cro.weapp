import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { STORAGE_KEYS } from './utils/storage-keys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Portal Wee Express';
  userData: any;
  constructor(private storage: LocalStorageService) {}

  ngOnInit() {
    this.userData = this.storage.get(STORAGE_KEYS.USER_DATA);
    // console.log(this.userData);
  }
}
