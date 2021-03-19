import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpBookingTableComponent } from './sp-booking-table.component';

describe('SpBookingComponentComponent', () => {
  let component: SpBookingTableComponent;
  let fixture: ComponentFixture<SpBookingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpBookingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpBookingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
