import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBlocHomestayComponent } from './register-bloc-homestay.component';

describe('RegisterBlocHomestayComponent', () => {
  let component: RegisterBlocHomestayComponent;
  let fixture: ComponentFixture<RegisterBlocHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBlocHomestayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBlocHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
