import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPendingComponent } from './booking-pending.component';

describe('BookingPendingComponent', () => {
  let component: BookingPendingComponent;
  let fixture: ComponentFixture<BookingPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
