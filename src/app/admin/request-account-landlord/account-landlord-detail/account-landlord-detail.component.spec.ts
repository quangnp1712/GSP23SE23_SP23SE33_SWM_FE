import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLandlordDetailComponent } from './account-landlord-detail.component';

describe('AccountLandlordDetailComponent', () => {
  let component: AccountLandlordDetailComponent;
  let fixture: ComponentFixture<AccountLandlordDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountLandlordDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountLandlordDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
