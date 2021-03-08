import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db/db.service';
import { DropPointDialogComponent } from './drop-point-dialog/drop-point-dialog.component';

@Component({
  selector: 'app-drop-point',
  templateUrl: './drop-point.component.html',
  styleUrls: ['./drop-point.component.scss']
})
export class DropPointComponent implements OnInit {

  dropPoints: any = [];
  columns: string[] = [
    'company_name',
    'company_contact_no',
    'email',
    'area',
    'drop_points',
    'actions',
  ];

  constructor(private dbService: DbService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDropPoints();
  }

  getDropPoints() {
    this.dbService.getSPDropPoints().subscribe((data) => {
      this.dropPoints = data;
      console.log(data);
    });
  }
  
  getRow(row: any) {
    let dialogRef = this.dialog.open(DropPointDialogComponent, {
      height: '400px',
      width: '1200px',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getDropPoints();
    });
  }

}
