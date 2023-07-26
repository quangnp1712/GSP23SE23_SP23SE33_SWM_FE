import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocHomestayDetailComponent } from './bloc-homestay-detail.component';

describe('BlocHomestayDetailComponent', () => {
  let component: BlocHomestayDetailComponent;
  let fixture: ComponentFixture<BlocHomestayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocHomestayDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlocHomestayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
