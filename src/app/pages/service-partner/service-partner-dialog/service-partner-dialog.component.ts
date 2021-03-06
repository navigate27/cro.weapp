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
import { RESPONSE_CODES } from 'src/app/utils/response-codes';

@Component({
  selector: 'app-service-partner-dialog',
  templateUrl: './service-partner-dialog.component.html',
  styleUrls: ['./service-partner-dialog.component.scss'],
})
export class ServicePartnerDialogComponent implements OnInit {
  spFormGroup: FormGroup = ServicePartnerFormGroup;
  isSaveDisabled: boolean = true;
  isCreate: boolean = true;
  messageButton: string = 'Add';
  formGroupSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ServicePartnerDialogComponent>,
    private dbService: DbService,
    private dialog: MatDialog
  ) {
    this.formGroupSubscription = this.spFormGroup.statusChanges.subscribe(
      (status) => {
        this.isSaveDisabled = status === 'VALID' ? false : true;
      }
    );
  }

  ngOnInit(): void {
    console.log(this.data);
    this.spFormGroup.reset();
    if (this.data) {
      this.messageButton = 'Save';
      this.isCreate = false;
      this.spFormGroup.patchValue(this.data);
    }
  }

  saveButton() {
    let request: any;

    if (this.isCreate) {
      request = this.spFormGroup.value;
      this.dbService.addSP(request).subscribe((data) => {
        console.log(data);
        if (data.response_code == RESPONSE_CODES.SUCCESS) {
          this.dialogRef.close();
        }
      });
    } else {
      request = {
        id: this.data.id,
        ...this.spFormGroup.value,
      };
      this.dbService.updateSP(request).subscribe((data) => {
        console.log(data);
        if (data.response_code == RESPONSE_CODES.SUCCESS) {
          this.dialogRef.close();
        }
      });
    }
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
        this.dbService.deleteSP(request).subscribe((response) => {
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
