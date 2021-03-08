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
import { DropPointFormGroup } from 'src/app/utils/form-group/drop-point';

@Component({
  selector: 'app-drop-point-dialog',
  templateUrl: './drop-point-dialog.component.html',
  styleUrls: ['./drop-point-dialog.component.scss'],
})
export class DropPointDialogComponent implements OnInit {
  dropPointFormGroup: FormGroup = DropPointFormGroup;
  isSaveDisabled: boolean = true;
  hasDropPoints: boolean = false;
  saveSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DropPointDialogComponent>,
    private dbService: DbService
  ) {
    this.saveSubscription = this.dropPointFormGroup.statusChanges.subscribe(
      (status) => {
        this.isSaveDisabled = status === 'VALID' ? false : true;
      }
    );
  }

  ngOnInit(): void {
    console.log(this.data);
    this.clearFormArray();
    if (this.data) {
      _.forEach(this.data.drop_points, () => {
        let dropPoint: FormGroup = this.newDPItem();
        this.dropPoints().push(dropPoint);
        this.hasDropPoints = true;
      });

      this.dropPointFormGroup.patchValue(this.data);
      console.log(this.dropPointFormGroup);
    }
  }

  dropPoints(): FormArray {
    return this.dropPointFormGroup.get('drop_points') as FormArray;
  }

  newDPItem(): FormGroup {
    return new FormBuilder().group({
      drop_point_name: ['', [Validators.required]],
      drop_point_area: ['', [Validators.required]],
      drop_point_contact_person: ['', [Validators.required]],
      drop_point_contact_no: ['', [Validators.required]],
      drop_point_address_others: ['', [Validators.required]],
      drop_point_address_barangay: ['', [Validators.required]],
      drop_point_address_city: ['', [Validators.required]],
      drop_point_address_province: ['', [Validators.required]],
    });
  }

  removeDropPoint(dpi: number) {
    this.dropPoints().removeAt(dpi);
  }

  addDropPoint() {
    this.dropPoints().push(this.newDPItem());
  }

  clearFormArray() {
    this.dropPoints().clear();
  }

  saveButton() {
    const dropPointData = this.dropPointFormGroup.value;
    const request = {
      service_partner_id: this.data.id,
      ...dropPointData,
    };

    this.dbService.addDropPoints(request).subscribe((data) => {
      console.log(data);
      if (data.response_code == RESPONSE_CODES.SUCCESS) {
        this.dialogRef.close();
      }
    });
  }
}
