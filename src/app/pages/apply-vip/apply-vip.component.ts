import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplyVIPFormGroup } from 'src/app/utils/form-group/apply-vip';

@Component({
  selector: 'app-apply-vip',
  templateUrl: './apply-vip.component.html',
  styleUrls: ['./apply-vip.component.scss'],
})
export class ApplyVipComponent implements OnInit {
  applyVIPFormGroup: FormGroup = ApplyVIPFormGroup;
  isUserExists: boolean = true;
  isApplyDisabled: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  applyVIP(){
    
  }
}
