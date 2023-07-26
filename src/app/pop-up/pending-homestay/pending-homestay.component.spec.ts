import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingHomestayComponent } from './pending-homestay.component';

describe('PendingHomestayComponent', () => {
  let component: PendingHomestayComponent;
  let fixture: ComponentFixture<PendingHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingHomestayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
