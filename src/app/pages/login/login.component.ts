import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  constructor() {}

  ngOnInit(): void {
    this.loginSubscription = this.loginFormGroup.statusChanges.subscribe(
      (status) => {
        this.isDisabledLogin = status == 'VALID' ? false : true;
      }
    );
  }
  
  login(){
    
  }
}
