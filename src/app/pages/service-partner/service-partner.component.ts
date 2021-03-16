import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db/db.service';
import { ServicePartnerDialogComponent } from './service-partner-dialog/service-partner-dialog.component';

@Component({
  selector: 'app-service-partner',
  templateUrl: './service-partner.component.html',
  styleUrls: ['./service-partner.component.scss'],
})
export class ServicePartnerComponent implements OnInit {
  servicePartners: any = [];
  columns: string[] = [
    'checked',
    'company_name',
    'company_address',
    'company_contact_no',
    'email',
    'business_category',
    'area',
    'actions'
  ];

  constructor(private dbService: DbService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getSPs();
  }

  getSPs() {
    this.dbService.getSPs().subscribe((data) => {
      this.servicePartners = data;
      console.log(data);
    });
  }

  getRow(row: any) {
    let dialogRef = this.dialog.open(ServicePartnerDialogComponent, {
      height: '400px',
      width: '650px',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getSPs();
    });
  }

  addSP() {
    let dialogRef = this.dialog.open(ServicePartnerDialogComponent, {
      height: '400px',
      width: '650px',
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getSPs();
    });
  }
}
