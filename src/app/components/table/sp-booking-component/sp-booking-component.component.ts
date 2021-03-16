import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sp-booking-component',
  templateUrl: './sp-booking-component.component.html',
  styleUrls: ['./sp-booking-component.component.scss'],
})
export class SpBookingComponentComponent implements OnInit {
  @Input() bookings: any = [];
  @Input() getRow: any = [];
  columns: string[] = [
    'order_no',
    'book_date',
    'book_type',
    'update_date',
    'payment_type',
    'total_amount',
    'book_status',
    'is_exported',
  ];
  constructor() {}

  ngOnInit(): void {}
}
