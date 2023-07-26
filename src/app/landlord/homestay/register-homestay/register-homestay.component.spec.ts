import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHomestayComponent } from './register-homestay.component';

describe('RegisterHomestayComponent', () => {
  let component: RegisterHomestayComponent;
  let fixture: ComponentFixture<RegisterHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterHomestayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
