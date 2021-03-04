import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { LoginFormGroup } from '../../utils/form-group/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = LoginFormGroup;
  loginSubscription: Subscription = new Subscription();
  isDisabledLogin: boolean = true;
  constructor(private loginService: LoginService) {}

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
    this.loginService.getLogin(request).subscribe((data) => {
      console.log(data);
    });
  }
}
