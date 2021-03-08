import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db/db.service';
import { VipDialogComponent } from './vip-dialog/vip-dialog.component';
import { VipStatusComponent } from './vip-status/vip-status.component';

@Component({
  selector: 'app-vip',
  templateUrl: './vip.component.html',
  styleUrls: ['./vip.component.scss'],
})
export class VipComponent implements OnInit {
  vips: any = [];
  columns: string[] = [
    'name',
    'email',
    'mobile_number',
    'company_name',
    'shipper_type',
    'vip_status',
    'actions',
  ];

  constructor(private dbService: DbService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getVIPs();
  }

  getVIPs() {
    this.dbService.getVIPs().subscribe((data) => {
      this.vips = data;
      console.log(data);
    });
  }

  updateStatus(row: any) {
    console.log(row);
    let dialogRef = this.dialog.open(VipStatusComponent, {
      height: '220px',
      width: '300px',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getVIPs();
    });
  }
  
  getRow(row: any) {
    let dialogRef = this.dialog.open(VipDialogComponent, {
      height: '400px',
      width: '650px',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getVIPs();
    });
  }
}
