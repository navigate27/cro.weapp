import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipStatusComponent } from './vip-status.component';

describe('VipStatusComponent', () => {
  let component: VipStatusComponent;
  let fixture: ComponentFixture<VipStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VipStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
