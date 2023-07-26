import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLandlordComponent } from './dashboard-landlord.component';

describe('DashboardLandlordComponent', () => {
  let component: DashboardLandlordComponent;
  let fixture: ComponentFixture<DashboardLandlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardLandlordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
