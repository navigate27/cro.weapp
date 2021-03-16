import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpBookingComponent } from './sp-booking.component';

describe('SpBookingComponent', () => {
  let component: SpBookingComponent;
  let fixture: ComponentFixture<SpBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
