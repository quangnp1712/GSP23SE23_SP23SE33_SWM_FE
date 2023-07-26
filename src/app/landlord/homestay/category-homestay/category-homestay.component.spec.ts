import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHomestayComponent } from './category-homestay.component';

describe('CategoryHomestayComponent', () => {
  let component: CategoryHomestayComponent;
  let fixture: ComponentFixture<CategoryHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryHomestayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
