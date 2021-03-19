import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  DoCheck,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SpTableSpecs } from 'src/app/models/specs/sp-table-specs';

@Component({
  selector: 'sp-booking-table',
  templateUrl: './sp-booking-table.component.html',
  styleUrls: ['./sp-booking-table.component.scss'],
})
export class SpBookingTableComponent implements OnInit, OnChanges {
  @Output() filterBookingsEvent = new EventEmitter();
  @Output() downloadCSVEvent = new EventEmitter();

  @Input() spBookingTableSpecs: SpTableSpecs = {
    bookings: [],
    bookingStatus: '',
  };
  @Input() updateCheck: any;

  dataSource = new MatTableDataSource<Element>(
    this.spBookingTableSpecs.bookings
  );
  selection = new SelectionModel<Element>(true, []);

  filter = {
    bookType: null,
    dateFrom: null,
    dateTo: null,
    bookingStatus: '',
  };

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

  hasBookings: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Element>(
      this.spBookingTableSpecs.bookings
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    const bookings = this.spBookingTableSpecs.bookings;
    this.hasBookings = false;
    if (bookings && bookings.length != 0) {
      this.hasBookings = true;
      this.dataSource = new MatTableDataSource<Element>(
        this.spBookingTableSpecs.bookings
      );
      this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  filterBookings() {
    this.filter.bookingStatus = this.spBookingTableSpecs.bookingStatus;
    console.log(this.filter);
    this.filterBookingsEvent.emit(this.filter);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  downloadCSV() {
    this.downloadCSVEvent.emit({
      selection: this.selection,
      filter: this.filter,
      hasDownloadCSV: this.spBookingTableSpecs.hasDownloadCSV
    });
  }
}
