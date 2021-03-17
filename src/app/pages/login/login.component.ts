import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { LoginFormGroup } from '../../utils/form-group/login';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { RESPONSE_CODES } from 'src/app/utils/response-codes';
import { STORAGE_KEYS } from 'src/app/utils/storage-keys';
import { ACCOUNT_TYPES } from 'src/app/utils/account-types';
import { ROUTES } from 'src/app/utils/routes';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = LoginFormGroup;
  loginSubscription: Subscription = new Subscription();
  isDisabledLogin: boolean = true;
  userData: any = null;
  constructor(
    private loginService: LoginService,
    private storage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginSubscription = this.loginFormGroup.statusChanges.subscribe(
      (status) => {
        this.isDisabledLogin = status == 'VALID' ? false : true;
      }
    );

    this.userData = this.storage.get(STORAGE_KEYS.USER_DATA);
    console.log(this.userData);
    if (this.userData) {
      this.router.navigate([ROUTES.SP_BOOKING]);
      location.reload();
    }
  }

  login() {
    const request = this.loginFormGroup.value;
    console.log(request);
    this.loginService.getLogin(request).subscribe((data) => {
      console.log(data);
      if (data.response_code == RESPONSE_CODES.SUCCESS) {
        this.userData = data.user_data;
        this.storage.set(STORAGE_KEYS.USER_DATA, this.userData);
        if (this.userData.account_type == ACCOUNT_TYPES.SERVICE_PARTNER) {
          this.router.navigate([ROUTES.SP_BOOKING]);
          location.reload();
        }
      }
    });
  }
}
