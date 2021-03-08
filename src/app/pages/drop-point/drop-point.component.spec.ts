import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropPointComponent } from './drop-point.component';

describe('DropPointComponent', () => {
  let component: DropPointComponent;
  let fixture: ComponentFixture<DropPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
