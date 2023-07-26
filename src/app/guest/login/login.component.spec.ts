import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLandlordComponent } from './login.component';

describe('LoginLandlordComponent', () => {
  let component: LoginLandlordComponent;
  let fixture: ComponentFixture<LoginLandlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginLandlordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
