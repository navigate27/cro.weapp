import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyVipComponent } from './apply-vip.component';

describe('ApplyVipComponent', () => {
  let component: ApplyVipComponent;
  let fixture: ComponentFixture<ApplyVipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyVipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyVipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
