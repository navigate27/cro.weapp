import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePartnerDialogComponent } from './service-partner-dialog.component';

describe('ServicePartnerDialogComponent', () => {
  let component: ServicePartnerDialogComponent;
  let fixture: ComponentFixture<ServicePartnerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePartnerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePartnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
