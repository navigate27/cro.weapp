import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { DbService } from 'src/app/services/db/db.service';
import { ServicePartnerFormGroup } from 'src/app/utils/form-group/service-partner';
import { VIPFormGroup } from 'src/app/utils/form-group/vip';
import { RESPONSE_CODES } from 'src/app/utils/response-codes';

@Component({
  selector: 'app-vip-dialog',
  templateUrl: './vip-dialog.component.html',
  styleUrls: ['./vip-dialog.component.scss'],
})
export class VipDialogComponent implements OnInit {
  vipFormGroup: FormGroup = VIPFormGroup;
  isSaveDisabled: boolean = true;
  formGroupSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VipDialogComponent>,
    private dbService: DbService,
    private dialog: MatDialog
  ) {
    this.formGroupSubscription = this.vipFormGroup.statusChanges.subscribe(
      (status) => {
        this.isSaveDisabled = status === 'VALID' ? false : true;
      }
    );
  }

  ngOnInit(): void {
    console.log(this.data);
    this.vipFormGroup.reset();
    if (this.data) {
      this.vipFormGroup.patchValue(this.data);
      const name: any = this.vipFormGroup.get('name');
      name.setValue(`${this.data.firstname || ''} ${this.data.lastname || ''}`);
    }
  }

  saveButton() {
    const request = {
      id: this.data.id,
      ...this.vipFormGroup.value,
    };
    this.dbService.updateVIP(request).subscribe((data) => {
      console.log(data);
      if (data.response_code == RESPONSE_CODES.SUCCESS) {
        this.dialogRef.close();
      }
    });
  }

  deleteButton() {
    let deleteDialog = this.dialog.open(ConfirmationDialogComponent, {
      height: '200px',
      width: '300px',
      data: {
        message: 'Are you sure you want to delete this record?',
      },
    });

    deleteDialog.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === true) {
        const request = {
          id: this.data.id,
        };
        this.dbService.deleteVIP(request).subscribe((response) => {
          console.log(response);
          if (response.response_code == RESPONSE_CODES.SUCCESS) {
            this.dialogRef.close();
            deleteDialog.close();
          }
        });
      }
    });
  }
}
