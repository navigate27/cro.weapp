import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpBookingComponentComponent } from './sp-booking-component.component';

describe('SpBookingComponentComponent', () => {
  let component: SpBookingComponentComponent;
  let fixture: ComponentFixture<SpBookingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpBookingComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpBookingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
