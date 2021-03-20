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
  token: string = '';

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
  }

  login() {
    const request = this.loginFormGroup.value;
    console.log(request);
    this.loginService.getLogin(request).subscribe((data: any) => {
      if (data.response_code == RESPONSE_CODES.SUCCESS) {
        this.token = data.token;
        this.storage.set(STORAGE_KEYS.TOKEN, this.token, 1, 'd');

        this.loginService.getUser().subscribe((data) => {
          console.log(data);
          this.storage.set(STORAGE_KEYS.USER_DATA, data, 1, 'd');
          this.router.navigate([ROUTES.SP_BOOKING]);
        });
      }
    });
  }
}
