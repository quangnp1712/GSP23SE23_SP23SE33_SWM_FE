import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocHomestayComponent } from './bloc-homestay.component';

describe('BlocHomestayComponent', () => {
  let component: BlocHomestayComponent;
  let fixture: ComponentFixture<BlocHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocHomestayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlocHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
