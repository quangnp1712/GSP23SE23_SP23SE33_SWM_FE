import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionCreateComponent } from './promotion-create.component';

describe('PromotionCreateComponent', () => {
  let component: PromotionCreateComponent;
  let fixture: ComponentFixture<PromotionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
