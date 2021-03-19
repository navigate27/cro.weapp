import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db/db.service';
import { SpBookingParcelDetailsComponent } from './sp-booking-parcel-details/sp-booking-parcel-details.component';
import * as moment from 'moment';
import { UtilService } from 'src/app/services/utils/util.service';
import { LocalStorageService } from 'angular-web-storage';
import { STORAGE_KEYS } from 'src/app/utils/storage-keys';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/utils/routes';
import { RESPONSE_CODES } from 'src/app/utils/response-codes';
import { SpTableSpecs } from 'src/app/models/specs/sp-table-specs';

@Component({
  selector: 'app-sp-booking',
  templateUrl: './sp-booking.component.html',
  styleUrls: ['./sp-booking.component.scss'],
})
export class SpBookingComponent implements OnInit {
  userData: any;

  sp_id: number = 0;
  bookingStatus: string = 'PENDING';
  sortationStatus: string = 'FOR PICK-UP';

  updateCheckBooking: any;
  updateCheckSortation: any;
  bookings: any = [];
  bookingsSortation: any = [];

  filter = {
    bookType: null,
    dateFrom: null,
    dateTo: null,
  };

  filterSortation = {
    bookType: null,
    dateFrom: null,
    dateTo: null,
  };

  spBookingsTableSpecs: SpTableSpecs = {
    bookingStatus: this.bookingStatus,
    bookings: [],
    hasDownloadCSV: true,
  };

  spSortationTableSpecs: SpTableSpecs = {
    bookingStatus: this.sortationStatus,
    bookings: [],
    hasDownloadCSV: false,
  };

  constructor(
    private dbService: DbService,
    public dialog: MatDialog,
    private utilService: UtilService,
    private storage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = this.storage.get(STORAGE_KEYS.USER_DATA);
    if (this.userData) {
      this.sp_id = this.userData.service_partner_id;
    }
    if (!this.userData) {
      this.storage.clear();
      this.router.navigate([ROUTES.LOGIN]);
      location.reload();
    }
    console.log(this.userData);

    this.spBookingsTableSpecs.orderIdClick = (row: any) => {
      this.getRowBookings(row);
    };

    this.spSortationTableSpecs.orderIdClick = (row: any) => {
      this.getRowSortation(row);
    };
  }

  getBookingsDateRange(filter: any) {
    const request = {
      service_partner_id: this.sp_id,
      date_from: filter.dateFrom,
      date_to: filter.dateTo,
      book_type: filter.bookType,
      booking_status: filter.bookingStatus,
    };

    console.log(request);
    this.dbService.getBookingsDateRange(request).subscribe(
      (data) => {
        console.log(data);
        this.spBookingsTableSpecs.bookings = data.booking_data;
        this.updateCheckBooking = moment().format('SSSSSSSSS');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBookingsSortationDateRange(filter: any) {
    const request = {
      service_partner_id: this.sp_id,
      date_from: filter.dateFrom,
      date_to: filter.dateTo,
      book_type: filter.bookType,
      booking_status: filter.bookingStatus,
    };

    console.log(request);
    this.dbService.getBookingsDateRange(request).subscribe(
      (data) => {
        console.log(data);
        this.spSortationTableSpecs.bookings = data.booking_data;
        this.updateCheckSortation = moment().format('SSSSSSSSS');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRowBookings(row: any) {
    let dialogRef = this.dialog.open(SpBookingParcelDetailsComponent, {
      height: '320px',
      width: '650px',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getRowSortation(row: any) {
    let dialogRef = this.dialog.open(SpBookingParcelDetailsComponent, {
      height: '320px',
      width: '650px',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  async filterBookings(filter: any) {
    const dateFrom = filter
      ? moment(filter.dateFrom).format('YYYY-MM-DD 00:00:00')
      : '';
    const dateTo = filter
      ? moment(filter.dateTo).format('YYYY-MM-DD 00:00:00')
      : '';
    const filterOptions = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      bookType: filter.bookType,
      bookingStatus: filter.bookingStatus,
    };
    console.log(filterOptions);
    this.getBookingsDateRange(filterOptions);
  }

  async filterBookingsSortation(filter: any) {
    const dateFrom = filter
      ? moment(filter.dateFrom).format('YYYY-MM-DD 00:00:00')
      : '';
    const dateTo = filter
      ? moment(filter.dateTo).format('YYYY-MM-DD 00:00:00')
      : '';
    const filterOptions = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      bookType: filter.bookType,
      bookingStatus: filter.bookingStatus,
    };
    console.log(filterOptions);
    this.getBookingsSortationDateRange(filterOptions);
  }

  downloadCSV(event: any) {
    console.log(event);
    const dateNow = moment().format('YYYY-MM-DD');
    const filename = `${dateNow}.csv`;
    let csvData: any = [];
    let exportedIds: string[] = [];

    event.selection.selected.forEach((row: any) => {
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

    this.utilService.exportToCsv(filename, csvData);
    console.log(exportedIds);
    console.log(csvData);
    if (event.hasDownloadCSV) {
      this.updateBookingExported(exportedIds, event.filter);
    }
  }

  updateBookingExported(ids: string[], filter: any) {
    const request = {
      booking_detail_id: ids,
    };
    this.dbService.updateBookingExported(request).subscribe((data) => {
      console.log(data);
      if (data.response_code == RESPONSE_CODES.SUCCESS) {
        const dateFrom = filter
          ? moment(filter.dateFrom).format('YYYY-MM-DD 00:00:00')
          : '';
        const dateTo = filter
          ? moment(filter.dateTo).format('YYYY-MM-DD 00:00:00')
          : '';
        const filterOptions = {
          dateFrom: dateFrom,
          dateTo: dateTo,
          bookType: filter.bookType,
          bookingStatus: filter.bookingStatus,
        };
        this.getBookingsDateRange(filterOptions);
      }
    });
  }
}
