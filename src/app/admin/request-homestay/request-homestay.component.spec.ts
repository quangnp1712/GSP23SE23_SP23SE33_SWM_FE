import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHomestayComponent } from './request-homestay.component';

describe('RequestHomestayComponent', () => {
  let component: RequestHomestayComponent;
  let fixture: ComponentFixture<RequestHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestHomestayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
