import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/services/db/db.service';
import { RESPONSE_CODES } from 'src/app/utils/response-codes';
import * as _ from 'lodash';
import { ParcelDetailsFormGroup } from 'src/app/utils/form-group/parcel-details';

@Component({
  selector: 'app-sp-booking-parcel-details',
  templateUrl: './sp-booking-parcel-details.component.html',
  styleUrls: ['./sp-booking-parcel-details.component.scss']
})
export class SpBookingParcelDetailsComponent implements OnInit {

  parcelDetailsFormGroup: FormGroup = ParcelDetailsFormGroup;
  isSaveDisabled: boolean = true;
  saveSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SpBookingParcelDetailsComponent>,
  ) {
    this.saveSubscription = this.parcelDetailsFormGroup.statusChanges.subscribe(
      (status) => {
        this.isSaveDisabled = status === 'VALID' ? false : true;
      }
    );
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.parcelDetailsFormGroup.patchValue(this.data);
      console.log(this.parcelDetailsFormGroup);
    }
  }

}
