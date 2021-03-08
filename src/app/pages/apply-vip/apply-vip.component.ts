import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/services/db/db.service';
import { ApplyVIPFormGroup } from 'src/app/utils/form-group/apply-vip';
import { RESPONSE_CODES } from 'src/app/utils/response-codes';

@Component({
  selector: 'app-apply-vip',
  templateUrl: './apply-vip.component.html',
  styleUrls: ['./apply-vip.component.scss'],
})
export class ApplyVipComponent implements OnInit {
  applyVIPFormGroup: FormGroup = ApplyVIPFormGroup;
  isUserExists: boolean = false;
  isApplyDisabled: boolean = true;
  isSubmitted: boolean = false;
  applyButtonSubscription: Subscription;
  userData: any;
  servicePlatform: string = 'Wee Express Web App';

  constructor(private dbService: DbService) {
    this.applyButtonSubscription = this.applyVIPFormGroup.statusChanges.subscribe(
      (status) => {
        this.isApplyDisabled = status === 'VALID' ? false : true;
      }
    );
  }

  ngOnInit(): void {}

  searchEmail() {
    const emailFormGroup: any = this.applyVIPFormGroup.get('email');
    const request = {
      email: emailFormGroup.value,
    };
    this.dbService.getUserByEmail(request).subscribe((data) => {
      console.log(data);
      this.userData = data;
      this.isUserExists = true;
      this.applyVIPFormGroup.patchValue({
        ...this.userData,
        ...{
          name: `${this.userData.firstname} ${this.userData.lastname}`,
          mobile_number: this.userData.mobile_number,
          platform: this.servicePlatform,
          user_id: this.userData.id,
        },
      });
    });
  }

  applyVIP() {
    const request = this.applyVIPFormGroup.value;
    this.dbService.addVIP(request).subscribe((data) => {
      console.log(data);
      if (data.response_code == RESPONSE_CODES.SUCCESS) {
        this.isSubmitted = true;
      }
    });
  }
}
