import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropPointDialogComponent } from './drop-point-dialog.component';

describe('DropPointDialogComponent', () => {
  let component: DropPointDialogComponent;
  let fixture: ComponentFixture<DropPointDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropPointDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropPointDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
