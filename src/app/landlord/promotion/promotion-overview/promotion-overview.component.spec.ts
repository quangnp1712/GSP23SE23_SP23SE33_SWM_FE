import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionOverviewComponent } from './promotion-overview.component';

describe('PromotionOverviewComponent', () => {
  let component: PromotionOverviewComponent;
  let fixture: ComponentFixture<PromotionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
