import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBlocHomestayComponent } from './request-bloc-homestay.component';

describe('RequestBlocHomestayComponent', () => {
  let component: RequestBlocHomestayComponent;
  let fixture: ComponentFixture<RequestBlocHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestBlocHomestayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestBlocHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
