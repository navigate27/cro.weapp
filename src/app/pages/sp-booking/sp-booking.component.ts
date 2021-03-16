import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db/db.service';
import { SpBookingParcelDetailsComponent } from './sp-booking-parcel-details/sp-booking-parcel-details.component';
import * as moment from 'moment';
import { UtilService } from 'src/app/services/utils/util.service';

@Component({
  selector: 'app-sp-booking',
  templateUrl: './sp-booking.component.html',
  styleUrls: ['./sp-booking.component.scss'],
})
export class SpBookingComponent implements OnInit {
  bookings: any = [];
  filter = {
    bookType: null,
    dateFrom: null,
    dateTo: null,
  };

  dateFrom: string = '';
  dateTo: string = '';

  hasBookings: boolean = false;
  columns: string[] = [
    'checked',
    'order_no',
    'book_date',
    'book_type',
    'update_date',
    'payment_type',
    'total_amount',
    'book_status',
    'is_exported',
  ];

  constructor(
    private dbService: DbService,
    public dialog: MatDialog,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    const filterOptions = {
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      bookType: this.filter.bookType,
    };
    this.getBookingsDateRange(filterOptions);
  }

  getBookingsDateRange(filter: any) {
    const request = {
      service_partner_id: '7',
      date_from: filter.dateFrom,
      date_to: filter.dateTo,
      book_type: filter.bookType,
      booking_status: 'PENDING',
    };
    console.log(request);
    this.dbService.getBookingsDateRange(request).subscribe((data) => {
      this.bookings = data.booking_data;
      this.hasBookings = false;
      if (this.bookings.length != 0) {
        this.hasBookings = true;
      }
      console.log(data);
    });
  }

  getRow(row: any) {
    let dialogRef = this.dialog.open(SpBookingParcelDetailsComponent, {
      height: '300px',
      width: '650px',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  filterBookings() {
    console.log(this.filter);
    this.dateFrom = moment(this.filter.dateFrom).format('YYYY-MM-DD 00:00:00');
    this.dateTo = moment(this.filter.dateTo).format('YYYY-MM-DD 23:59:59');
    const filterOptions = {
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      bookType: this.filter.bookType,
    };
    this.getBookingsDateRange(filterOptions);
  }

  updateCheckedList(row: any) {
    console.log(row);
  }

  downloadCSV() {
    const filename = `${this.dateFrom} - ${this.dateTo} ${
      this.filter.bookType || ''
    }.csv`;
    let csvData: any = [];
    let exportedIds: string[] = [];

    this.bookings.forEach((row: any) => {
      const rowData = {
        TRACKING_ID: row.tracking_id,
        ORDER_ID: row.order_id,
        ITEM_DESCRIPTION: row.item_details,
        PICKUP_DROPOFF: row.book_type,
        DATE_OF_PICKUP: row.book_type == 'DROP-OFF' ? '' : row.est_pickup_date,
        SHIPPER_NAME: row.shipper_name,
        SHIPPER_CITY: row.shipper_city,
        SHIPPER_PROVINCE: row.shipper_province,
        SHIPPER_CONTACT_NUMBER: row.shipper_mobile_no,
        SHIPPER_EMAIL_ADDRESS: '',
        CUSTOMER_CITY: row.customer_city,
        CUSTOMER_PROVINCE: row.customer_province,
        CUSTOMER_CONTACT_NUMBER: row.customer_mobile_no,
        CUSTOMER_EMAIL_ADDRESS: '',
        ITEM_VALUE: row.item_value,
        MODE_OF_PAYMENT: row.payment_type,
        LENGTH: row.length,
        WIDTH: row.width,
        HEIGHT: row.height,
        WEIGHT: row.weight,
        RACK_SECTOR: '',
        ROUTE_ID: '',
      };
      csvData.push(rowData);
      exportedIds.push(row.booking_detail_id);
    });

    // this.utilService.exportToCsv(filename, csvData);
    console.log(exportedIds);
  }
}
