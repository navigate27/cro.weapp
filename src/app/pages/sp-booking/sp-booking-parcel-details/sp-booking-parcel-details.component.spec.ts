import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpBookingParcelDetailsComponent } from './sp-booking-parcel-details.component';

describe('SpBookingParcelDetailsComponent', () => {
  let component: SpBookingParcelDetailsComponent;
  let fixture: ComponentFixture<SpBookingParcelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpBookingParcelDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpBookingParcelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
