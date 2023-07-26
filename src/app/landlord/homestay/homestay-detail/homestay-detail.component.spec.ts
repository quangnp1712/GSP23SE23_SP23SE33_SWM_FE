import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomestayDetailComponent } from './homestay-detail.component';

describe('HomestayDetailComponent', () => {
  let component: HomestayDetailComponent;
  let fixture: ComponentFixture<HomestayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomestayDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomestayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
