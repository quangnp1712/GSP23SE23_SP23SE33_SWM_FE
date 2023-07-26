import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTwoComponent } from './test-two.component';

describe('TestTwoComponent', () => {
  let component: TestTwoComponent;
  let fixture: ComponentFixture<TestTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
