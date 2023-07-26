import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSuccessComponent } from './balance-success.component';

describe('BalanceSuccessComponent', () => {
  let component: BalanceSuccessComponent;
  let fixture: ComponentFixture<BalanceSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
