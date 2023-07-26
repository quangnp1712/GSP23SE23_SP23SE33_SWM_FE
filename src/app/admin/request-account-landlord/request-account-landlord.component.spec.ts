import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAccountLandlordComponent } from './request-account-landlord.component';

describe('RequestAccountLandlordComponent', () => {
  let component: RequestAccountLandlordComponent;
  let fixture: ComponentFixture<RequestAccountLandlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAccountLandlordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAccountLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
