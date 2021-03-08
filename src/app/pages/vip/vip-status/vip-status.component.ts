import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DbService } from 'src/app/services/db/db.service';
import { RESPONSE_CODES } from 'src/app/utils/response-codes';

@Component({
  selector: 'app-vip-status',
  templateUrl: './vip-status.component.html',
  styleUrls: ['./vip-status.component.scss'],
})
export class VipStatusComponent implements OnInit {
  appStatus: string = '';
  isSaveDisabled: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VipStatusComponent>,
    private dbService: DbService
  ) {}

  ngOnInit(): void {}

  selectStatus() {
    console.log(this.appStatus);
    if (this.appStatus) {
      this.isSaveDisabled = false;
    }
  }
  saveButton() {
    const request = {
      id: this.data.id,
      application_status: this.appStatus,
    };
    this.dbService.updateVIPStatus(request).subscribe((data) => {
      console.log(data);
      if (data.response_code == RESPONSE_CODES.SUCCESS) {
        this.dialogRef.close();
      }
    });
  }
}
