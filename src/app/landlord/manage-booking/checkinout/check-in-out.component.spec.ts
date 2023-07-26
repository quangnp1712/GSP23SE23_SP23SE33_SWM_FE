import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInOutComponent } from './check-in-out.component';

describe('BookingHistoryComponent', () => {
  let component: CheckInOutComponent;
  let fixture: ComponentFixture<CheckInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
